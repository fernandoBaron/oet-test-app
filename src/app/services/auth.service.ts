import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MenuController, NavController } from '@ionic/angular';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = environment.SERVER;
  token: string = null;

  constructor(private httpClient: HttpClient,
              private menuController: MenuController,
              private navController: NavController) { }

  signup(user: UserInterface) {
    return this.httpClient.post(`${ this.server }/signup`, user);
  }

  login(email: string, password: string) {
    return this.httpClient.post(`${ this.server }/login`, {
      email,
      password
    })
      .pipe(
        map( (response: any) => {
          console.log(response.user);
          this.setEmail(email);
          this.setName(response.user);
          this.setToken(response.token);
        })
      )
      ;
  }
  clearAll() {
    localStorage.removeItem('token');
    localStorage.removeItem('identification');
    localStorage.removeItem('name');
  }

  async logout() {
    this.clearAll();
    this.menuController.enable(false);
    this.menuController.swipeGesture(false);
    await this.navController.navigateBack('/login');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkToken() {
    return this.httpClient.post(`${ this.server }/checkToken`, {})
      .pipe(
        catchError( (err, o) => of({ ok: false })),
        map( (data: any) =>  data.ok),
      )
      ;
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  private setName(name: string) {
    localStorage.setItem('name', name);
  }
}
