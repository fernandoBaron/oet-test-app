import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: UserInterface

  constructor(private menuController: MenuController,
              private userService: UserService) { 
                this.getUser()
                this.menuController.enable(true);
                this.menuController.swipeGesture(true);
               }

  ngOnInit() {
    
  }

  getUser(){
    this.userService.getUser()
    .subscribe((response: any) => {
      console.log(response);
      this.user = response.user
      console.log(this.user, 'user Asignado')
    }, (error: any) => {
      console.log(error);
    })
  }
}
