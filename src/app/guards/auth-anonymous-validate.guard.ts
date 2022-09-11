import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {observable, Observable, of} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthAnonymousValidateGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate() {
    if ( this.authService.getToken() === null ) {
      return true;
    } else {
      return this.authService.checkToken()
        .pipe(
          map(response => !response),
          tap( isAnonymous => {
            console.log(isAnonymous);
            if(!isAnonymous) {
              this.router.navigateByUrl('/home');
            } else {
               this.authService.logout();
            }
          }),
        )
        ;
    }
  }

}
