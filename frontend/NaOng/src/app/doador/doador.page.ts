import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-doador',
  templateUrl: './doador.page.html',
  styleUrls: ['./doador.page.scss'],
})
export class DoadorPage {
  nome: string = '';
  email: string = '';
  dataNascimento: string = '';
  cpf: string = '';
  senha: string = '';
  cpfMask: string = '';
  listDoador: any = [];
  idRecebido: any;
  mestre: any;
  mestreNovo: string = "";

  constructor(private http: HttpClient, private navCtrl: NavController, private activatedRoute: ActivatedRoute, private router: Router, public alertController: AlertController) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idRecebido = params['id'];
      console.log(this.idRecebido);
      this.http.get<any>(`http://localhost:3000/doador?id=${this.idRecebido}`).subscribe(
        (dados) => {
          console.log(dados)
          this.nome = dados[0].nome;
          this.email = dados[0].email;
          this.dataNascimento = dados[0].dataNascimento;
          this.cpf = dados[0].cpf;
          this.senha = dados[0].senha;
        },
        (error) => {
          console.error('Erro ao buscar registro:', error);
        }
      );//teste
    }
    );
    this.http.get<any>('http://localhost:3000/doador').subscribe(
      (data) => {
        // Verifica se as credenciais correspondem a algum usuário
        const foundUser = data.find((user: any) => {
          return user.id == this.idRecebido;
        });
        this.mestre = foundUser.mestre;
      },
      (error) => {
        // Tratamento de erro caso a solicitação não seja bem-sucedida
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  formatarCPF() {
    let cpfSemFormatacao = this.cpf.replace(/\D/g, '');
    this.cpf = cpfSemFormatacao.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
  }

  showHome() {
    this.router.navigate(['home'], {
      queryParams: { id: this.idRecebido },
      relativeTo: this.activatedRoute.parent
    });
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    // Envia os dados para o servidor JSON
    this.http.get('http://localhost:3000/doador').subscribe(
      (data) => {
        this.listDoador = data;
      },
      (error) => {
        console.error('Erro ao buscar doador:', error);
      }
    );
  }

  deletar(doadorExcluir: any) {
    if (doadorExcluir != 1) {
      this.http.delete(`http://localhost:3000/doador/${doadorExcluir}`).subscribe(
        (data) => {
          console.log('Doador excluido com sucesso:', data);
          this.showHome();
        },
        (error) => {
          console.error('Erro ao excluir doador:', error);
        }
      );
    }
  }

  cadastrar() {
    const novoDoador = {
      nome: this.nome,
      cpf: this.cpf.replace(/\D/g, ''), // Remove caracteres não numéricos do CPF
      email: this.email,
      dataNascimento: this.dataNascimento,
      senha: this.senha,
      mestre: this.mestreNovo,
    };
    if (!this.nome || !this.cpf || !this.email || !this.dataNascimento || !this.senha) {
      this.alertController.create({
        header: 'AVISO!',
        message: 'Digite todos os campos!',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    } else {

      if (this.idRecebido < 1) {
        // Se idRecebido for menor que 1, cadastra um novo doador
        this.http.post('http://localhost:3000/doador', novoDoador).subscribe(
          (data) => {
            console.log('Doador cadastrado com sucesso:', data);
            this.navCtrl.navigateBack('login'); // Redireciona para a página 'home' após o cadastro
          },
          (error) => {
            console.error('Erro ao cadastrar doador:', error);
          }
        );
      } else {
        if (this.idRecebido != 1) { //para deixar proibido atualizar usuario 1
          // Se idRecebido for maior ou igual a 1, faz um PUT para atualizar o doador
          this.http.put(`http://localhost:3000/doador/${this.idRecebido}`, novoDoador).subscribe(
            (data) => {
              console.log('Doador atualizado com sucesso:', data);
              //this.navCtrl.navigateBack('home'); // Redireciona para a página 'home' após a atualização
              this.showHome();
            },
            (error) => {
              console.error('Erro ao atualizar doador:', error);
            }
          );
        } else {
          this.alertController.create({
            header: 'AVISO!',
            message: 'Não é possível atualizar o doador 1!',
            buttons: ['OK']
          }).then(alert => {
            alert.present();
          });

        }
      }
    }
  }
}
