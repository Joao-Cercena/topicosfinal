import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({ 
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  id: number = 0;
  showUserNotFoundError: boolean = false;

  constructor(private navCtrl: NavController, private router: Router, private http: HttpClient, private activatedRoute:ActivatedRoute) {}
 
  login() {
    // Faz a solicitação HTTP para buscar os usuários
    this.http.get<any>('http://localhost:3000/doador').subscribe(
      (data) => {
        // Verifica se as credenciais correspondem a algum usuário
        const foundUser = data.find((user: any) => {
          return user.cpf === this.username && user.senha === this.password;
        });

        if (foundUser) {
          // Navigate with query params using ActivatedRoute
          this.router.navigate(['home'], {
            queryParams: { id: foundUser.id },
            relativeTo: this.activatedRoute.parent // Ensure the correct navigation context
          });
        } else {
          console.log('Credenciais inválidas');
          this.showUserNotFoundError = true; // Ativa a mensagem de erro
        }
      },
      (error) => {
        // Tratamento de erro caso a solicitação não seja bem-sucedida
        console.error('Erro ao buscar usuários:', error);
        this.showUserNotFoundError = true; // Ativa a mensagem de erro
      }
    );
  }
  loginNovo() {
      // Navigate to 'doador' with id as 0
      this.router.navigate(['doador'], {
        queryParams: { id: 0 }
      });
  }
    

}



