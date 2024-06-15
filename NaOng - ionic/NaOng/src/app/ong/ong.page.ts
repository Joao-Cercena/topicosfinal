import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.page.html',
  styleUrls: ['./ong.page.scss'],
})
export class OngPage implements OnInit {
  nome: string = '';
  email: string = '';
  cnpj: string = '';
  endereco: string = '';
  pedido: string = '';
  idRecebido: any;
  idOng: any;
  status: boolean = true;

  constructor(private http: HttpClient, public alertController: AlertController, private navCtrl: NavController, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idRecebido = params['id'];
      this.idOng = params['idOng'];
      console.log(this.idOng);
      if (params['idOng']) {
        this.idOng = params['idOng'];

        this.http.get<any>(`http://localhost:3000/ong?id=${this.idOng}`).subscribe(
          (dados) => {
            console.log(dados)
            this.nome = dados[0].nome;
            this.email = dados[0].email;
            this.cnpj = dados[0].cnpj;
            this.endereco = dados[0].endereco;
            this.pedido = dados[0].pedido;
            this.status = dados[0].status;
          },
          (error) => {
            console.error('Erro ao buscar registro:', error);
          }
        );
      }
    })
  }

  formatarCNPJ() {
    let cnpjSemFormatacao = this.cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
    this.cnpj = cnpjSemFormatacao.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      '$1.$2.$3/$4-$5'
    );
  }
  

  ngOnInit() {
  }
  showHome() {
    this.router.navigate(['home'], {
      queryParams: { id: this.idRecebido },
      relativeTo: this.activatedRoute.parent
    });
  }

  cadastrar() {
    const novoOng = {
      nome: this.nome,
      email: this.email,
      cnpj: this.cnpj.replace(/\D/g, ''), // Remove caracteres não numéricos do CNPJ
      endereco: this.endereco,
      pedido: this.pedido,
      status: this.status,
    };

    if (!this.nome || !this.email || !this.cnpj || !this.endereco || !this.pedido) {
      this.alertController.create({
        header: 'AVISO!',
        message: 'Digite todos os campos!',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    } else {
      if (this.idOng < 1 || !this.idOng) {
        // Se idRecebido for menor que 1, cadastra uma nova ONG
        this.http.post('http://localhost:3000/ong', novoOng).subscribe(
          (data) => {
            console.log('Ong cadastrada com sucesso:', data);
            this.showHome();
          },
          (error) => {
            console.error('Erro ao cadastrar Ong:', error);
          }
        );
      } else {
        // Se idRecebido for maior ou igual a 1, faz um PUT para atualizar a ONG
        this.http.put(`http://localhost:3000/ong/${this.idOng}`, novoOng).subscribe(
          (data) => {
            console.log('Ong atualizada com sucesso:', data);
            this.showHome();
          },
          (error) => {
            console.error('Erro ao atualizar Ong:', error);
          }
        );
      }
    }
  }

}

