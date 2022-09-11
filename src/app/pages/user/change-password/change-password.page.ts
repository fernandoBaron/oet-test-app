import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  form: FormGroup;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  showOldPassword: boolean;


  constructor(private userService: UserService,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private navController: NavController,
  ) {
    this.showOldPassword = false;
    this.showPassword = false;
    this.showPasswordConfirm = false;

    this.form = new FormGroup({
      oldPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      passwordConfirm: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
    });
  }

  ngOnInit() {
  }

  async passwordChange() {
    const loading = await this.loadingController.create({
      message: 'Conectando con el servidor...',
      duration: 5000,
    });
    await loading.present();
    this.userService.passwordChange(this.form.get('oldPassword').value, this.form.get('password').value)
      .subscribe(async () => {
        await loading.dismiss();
        await this.navController.navigateBack('/home');
        const alert = await this.alertController.create({
          header: 'Operación exitosa',
          message: 'Se ha cambiado su contraseña correctamente',
          buttons: ['OK'],
        });
        await alert.present();
      }, async (error: any) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Algo ha fallado',
          message: error.error.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }
}
