import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Mi Perfil', url: 'profile', icon: 'person' },
    { title: 'Mis Vehiculos', url: 'vehicle', icon: 'car' },
    { title: 'Cambiar Contraseña', url: 'change-password', icon: 'key' },
  ];


  constructor(private authService: AuthService) {}


  logout() {
    this.authService.logout();
  }
}
