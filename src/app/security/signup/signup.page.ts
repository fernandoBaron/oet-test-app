import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form: FormGroup;
  findTimeOut;

  showPassword: boolean;
  showConfirmPassword: boolean;

  constructor(private menuController: MenuController,
              private navController: NavController,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private authService: AuthService) {

    this.showPassword = false;
    this.showConfirmPassword = false;

    this.menuController.enable(false);
    this.menuController.swipeGesture(false);

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      identification: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      identificationType: new FormControl(false, Validators.compose([
      ])),
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.menuController.enable(true);
    this.menuController.swipeGesture(true);
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Conectando con el servidor, por favor espere..',
      duration: 5000,
    });
    await loading.present();
    const user: UserInterface = {
      email: this.form.get('email').value,
      identification: this.form.get('identification').value,
      identificationType: this.form.get('identificationType').value,
      firstname: this.form.get('firstname').value,
      lastname: this.form.get('lastname').value,
      phone: this.form.get('phone').value
    };
    let alert;
    this.authService.signup(user)
      .subscribe( async () => {
        await loading.dismiss();
        await this.navController.navigateBack('/login');
        alert = await this.alertController.create({
          header: 'Operación exitosa',
          message: 'Sus credenciales de acceso serán enviadas a su correo electrónico',
          buttons: ['OK']
        });
        await alert.present();
      }, async (error) => {
        await loading.dismiss();
        console.log(error);
        alert = await this.alertController.create({
          header: 'Algo salio mal',
          message: error.error.message,
          buttons: ['OK']
        });
        await alert.present();
      });
  }


}
