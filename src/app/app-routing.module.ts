import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthAnonymousValidateGuard } from './guards/auth-anonymous-validate.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    canActivate: [ AuthAnonymousValidateGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./security/login/login.module').then( m => m.LoginPageModule),
    canActivate: [ AuthAnonymousValidateGuard ]
  },
  {
    path: 'signup',
    loadChildren: () => import('./security/signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [ AuthAnonymousValidateGuard ]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/user/change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./pages/vehicle/vehicle-list/vehicle-list.module').then( m => m.VehicleListPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'vehicle-add',
    loadChildren: () => import('./pages/vehicle/vehicle-add/vehicle-add.module').then( m => m.VehicleAddPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
