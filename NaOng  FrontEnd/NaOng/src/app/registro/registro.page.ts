import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  id_ong: number = 0;
  descricao: string = '';
  setor: string = '';
  data: string = '';
  listOng: any = [];
  idRecebido: any;
  valor: number = 0.0;
  listRegistro: any = [];
  id_registro: number = 0;

  constructor(private http: HttpClient, public alertController: AlertController, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idRecebido = params['id'];

      if (params['id_registro']) {
        this.id_registro = params['id_registro'];

        this.http.get<any>(`http://localhost:3000/registro?id=${this.id_registro}`).subscribe(
          (dados) => {
            this.data = dados[0].data;
            this.id_ong = dados[0].id_ong;
            this.descricao = dados[0].descricao;
            this.valor = dados[0].valor;
            this.setor = dados[0].setor;

          },
          (error) => {
            console.error('Erro ao buscar registro:', error);
          }
        );
      }
    });
  }

  ionViewWillEnter() {
    this.listarOng();
    this.listarRegistro();
  }

  showHome() {
    this.router.navigate(['home'], {
      queryParams: { id: this.idRecebido },
      relativeTo: this.activatedRoute.parent
    });
  }

  editaRegistro(id_registro: any) {

    this.router.navigate(['registro'], {
      queryParams: { id: this.idRecebido, id_registro: id_registro },
      relativeTo: this.activatedRoute.parent
    });
  }

  cadastrar() {
    const novoRegistro = {
      id_ong: this.id_ong,
      id_doador: this.idRecebido,
      descricao: this.descricao,
      setor: this.setor,
      data: this.data,
      valor: this.valor,
    };

    if (!this.id_ong || !this.idRecebido || !this.descricao || !this.setor || !this.data) {
      this.alertController.create({
        header: 'AVISO!',
        message: 'Digite todos os campos!',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });
    } else {

      // Envia os dados para o servidor JSON
      if (!this.id_registro) {
        this.http.post('http://localhost:3000/registro', novoRegistro).subscribe(
          (data) => {
            console.log('Registro cadastrado com sucesso:', data);
            this.showHome();
          },
          (error) => {
            console.error('Erro ao cadastrar registro:', error);
          }
        );
      } else {
        this.http.put(`http://localhost:3000/registro/${this.id_registro}`, novoRegistro).subscribe(
          (data) => {
            this.alertController.create({
              header: 'ATUALIZADO!',
              message: 'Registro atualizado com sucesso!',
              buttons: ['OK']
            }).then(alert => {
              alert.present();
            });
            this.showHome();
          },
          (error) => {
            console.error('Erro ao cadastrar registro:', error);
          }
        );
      }
    }
  }

  deletar() {
    if (this.id_registro) {
      this.http.delete(`http://localhost:3000/registro/${this.id_registro}`).subscribe(
        (data) => {
          this.alertController.create({
            header: 'EXCLUIDO!',
            message: 'Registro excluído',
            buttons: ['OK']
          }).then(alert => {
            alert.present();
          });
          this.showHome();
        },
        (error) => {
          console.error('Erro ao deletar registro:', error);
        }
      );
    } else {
      this.alertController.create({
        header: 'AVISO!',
        message: 'Selecio um registro',
        buttons: ['OK']
      }).then(alert => {
        alert.present();
      });

    }
  }

  listarOng() {
    // Envia os dados para o servidor JSON
    this.http.get('http://localhost:3000/ong').subscribe(
      (data) => {
        this.listOng = data;
      },
      (error) => {
        console.error('Erro ao buscar ong:', error);
      }
    );
  }
  listarRegistro() {
    // Envia os dados para o servidor JSON
    this.http.get<any>(`http://localhost:3000/registro?id_doador=${this.idRecebido}`).subscribe(
      (data) => {
        this.listRegistro = data;
      },
      (error) => {
        console.error('Erro ao buscar registro:', error);
      }
    );
  }

}

