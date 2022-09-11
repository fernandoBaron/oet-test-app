import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from '../../../interfaces/user.interface';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
declare const window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: UserInterface;
  images: string[]= [];
  filePath: string;
  fileName: string;
  latitude: any;
  longitude: any;

  constructor(private userService: UserService,
              private camera: Camera,
              private navController: NavController,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private geolocation: Geolocation){
     this.getUser()
  }

  ngOnInit(): void {
      this.getUser()
  }

  getUser(){
    this.userService.getUser()
          .subscribe(async (response: any) => {
              this.user = response.user;
          });
  }

  async ionViewWillEnter() {
    await this.getUser();
  }

  async frontPicture(){
    const options: CameraOptions = {
      quality: 45,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 200,
    }
    this.camera.getPicture(options).then( async (imageData) => {
     const img = window.Ionic.WebView.convertFileSrc(imageData);
     this.images.push(img);
     this.fileName = img;
     this.filePath = imageData;     
     let alert;
     const loading = await this.loadingController.create({
      message: 'Conectando con el servidor, por favor espere..',
      duration: 5000,
    });
     await loading.present();
     await this.userService.frontPicture(this.fileName, this.filePath)
     .then( async () => {
      await loading.dismiss();
      await this.getUser();
      await this.navController.navigateBack('/profile');
      alert = await this.alertController.create({
        header: 'Operación exitosa',
        message: 'Se ha subido la foto de su documento con exito.',
        buttons: ['OK']
      });
      await alert.present();
    }, async (error) => {
      await loading.dismiss();
      alert = await this.alertController.create({
        header: 'Algo salio mal',
        message: error.error.message,
        buttons: ['OK']
      });
      await alert.present();
    });
    });  
  }

  async backPicture(){
    const options: CameraOptions = {
      quality: 45,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 200,
    }    
    this.camera.getPicture(options).then( async (imageData) => {
     const img = window.Ionic.WebView.convertFileSrc(imageData);
     this.images.push(img);
     this.fileName = img;
     this.filePath = imageData;
     let alert;
     const loading = await this.loadingController.create({
      message: 'Conectando con el servidor, por favor espere..',
      duration: 5000,
    });
     await loading.present();
     await this.userService.backPicture(this.fileName, this.filePath)
     .then( async () => {
      await loading.dismiss();
      this.getUser();
      await this.navController.navigateBack('/profile');
      alert = await this.alertController.create({
        header: 'Operación exitosa',
        message: 'Se ha subido la foto de su documento con exito.',
        buttons: ['OK']
      });
      await alert.present();
    }, async (error) => {
      await loading.dismiss();
      alert = await this.alertController.create({
        header: 'Algo salio mal',
        message: error.error.message,
        buttons: ['OK']
      });
      await alert.present();
    });
    });      
  }

  
  async getGeolocation(){
    this.geolocation.getCurrentPosition().then( async (resp) => {
      console.log(resp)
       this.latitude = resp.coords.latitude;
       this.longitude = resp.coords.longitude;
       let alert;
     const loading = await this.loadingController.create({
      message: 'Conectando con el servidor, por favor espere..',
      duration: 5000,
    });
     await loading.present();
     await this.userService.setLocation(this.latitude, this.longitude)
     .subscribe( async () => {
      await loading.dismiss();
      await this.getUser();
      await this.navController.navigateBack('/profile');
      alert = await this.alertController.create({
        header: 'Operación exitosa',
        message: 'Se ha cargado su ubcación con exito.',
        buttons: ['OK']
      });
      await alert.present();
    }, async (error) => {
      await loading.dismiss();
      alert = await this.alertController.create({
        header: 'Algo salio mal',
        message: error.error.message,
        buttons: ['OK']
      });
      await alert.present();
    });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    }
}
