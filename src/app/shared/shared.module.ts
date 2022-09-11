import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { MapComponent } from './map/map.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BackButtonComponent,
    MapComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BackButtonComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
