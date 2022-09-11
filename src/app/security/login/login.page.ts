import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  showPassword: boolean;


  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private authService: AuthService,
              private router: Router) {

    this.showPassword = false;;

    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ]))
    });

  }

  ngOnInit() {
    this.menuController.enable(false);
    this.menuController.swipeGesture(false);
  }



  ngOnDestroy(): void {
    this.menuController.enable(true);
    this.menuController.swipeGesture(true);
  }
  async login() {
    const loading = await this.loadingController.create({
      message: 'Conectando con el servidor. por favor espere un momento',
      duration: 5000,
    });
    await loading.present();
    this.authService.login(this.form.get('email').value, this.form.get('password').value)
      .subscribe(async (response: any) => {
        this.form.reset();
        await loading.dismiss();
        await this.router.navigateByUrl('/home');
      }, async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Credenciales incorrectas',
          message: 'Verifique que sus credenciales sean correctas',
          buttons: ['OK'],
        });
        await alert.present();
      });
  }
  clearEmail() {
    if (this.form.get('email').value) {
      this.form.get('email').setValue(this.form.get('email').value.trim());
    }
  }
}


