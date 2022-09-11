import { Component, OnInit } from '@angular/core';
import { VehicleInterface } from '../../../interfaces/vehicle.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { VehicleService } from '../../../services/vehicle.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var window: any;



@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.page.html',
  styleUrls: ['./vehicle-add.page.scss'],
})
export class VehicleAddPage implements OnInit {
  form: FormGroup;
  images: string[]= [];
  filePath: string;
  fileName: string;
  constructor(private alertController: AlertController,
              private navController: NavController,
              private loadingController: LoadingController,
              private vehicleService: VehicleService,
              private camera: Camera) {
    this.form = new FormGroup( {
      plate: new FormControl('', Validators.required),
      carBodywork: new FormControl('', Validators.required),
      configuration: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }
  async createVehicle() {
    const loading = await this.loadingController.create({
      message: 'Conectando con el servidor, por favor espere..',
      duration: 5000,
    });
    await loading.present();
    const vehicle: VehicleInterface = {
      plate: this.form.get('plate').value,
      carBodywork: this.form.get('carBodywork').value,
      configuration: this.form.get('configuration').value,
      model: this.form.get('model').value,
      fileName: this.fileName, 
      filePath: this.filePath,
    };
    let alert;
    this.vehicleService.add(vehicle)
      .then( async () => {
        await loading.dismiss();
        await this.navController.navigateBack('/vehicle');
        alert = await this.alertController.create({
          header: 'Operación exitosa',
          message: 'Se ha creado el vehiculo con exito.',
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
  }

  choosePicture(){
    const options: CameraOptions = {
      quality: 45,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 200,
    }    
    this.camera.getPicture(options).then((imageData) => {
     const img = window.Ionic.WebView.convertFileSrc(imageData);
     this.images.push(img);
     this.fileName = img;
     this.filePath = imageData;
     
    }, async (err) => {
      const alert = await this.alertController.create({
        header: 'Algo ha fallado',
        message: err.error.message,
        buttons: ['OK'],
      });
      await alert.present();
    });
  }
}
