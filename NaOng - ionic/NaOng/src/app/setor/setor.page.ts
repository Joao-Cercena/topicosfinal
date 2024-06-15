import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.page.html',
  styleUrls: ['./setor.page.scss'],
})
export class SetorPage implements OnInit {
  nome: string = '';

  constructor(private http: HttpClient, private navCtrl: NavController) {}

  ngOnInit() {
  }
  showHome(){
    this.navCtrl.navigateBack('home')
  }

  cadastrar() {
    const novoSetor = {
      nome: this.nome,    
    };

    // Envia os dados para o servidor JSON
    this.http.post('http://localhost:3000/setor', novoSetor).subscribe(
      (data) => {
        console.log('Setor cadastrado com sucesso:', data);
        this.navCtrl.navigateBack('home'); // Redireciona para a página 'home' após o cadastro
      },
      (error) => {
        console.error('Erro ao cadastrar setor:', error);
      }
    );
  }

}
