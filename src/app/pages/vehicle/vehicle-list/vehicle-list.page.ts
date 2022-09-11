import { Component, OnInit } from '@angular/core';
import { VehicleInterface } from '../../../interfaces/vehicle.interface';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { VehicleService } from 'src/app/services/vehicle.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.page.html',
  styleUrls: ['./vehicle-list.page.scss'],
})
export class VehicleListPage implements OnInit {
  vehicles: VehicleInterface[] = [];
  server: string

  constructor(private navController: NavController,
              private alertController: AlertController,
              private vehicleService: VehicleService,
              private loadingController: LoadingController,
              ) {
                this.server = environment.SERVER + '/vehicles/';
    this.updateData();
  }

  ngOnInit() {
  }

  async updateData() {
    this.vehicleService.showAll()
      .subscribe((response: any) => {
        console.log(response);
        this.vehicles = response.vehicles;
      }, async (error: any) => {
        const alert = await this.alertController.create({
          header: 'Algo ha fallado',
          message: error.error.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }

  async ionViewDidEnter() {
    await this.updateData();
  }

  async create() {
    await this.navController.navigateForward('/vehicle-add');
  }

  async remove(id: number) {
        const loading = await this.loadingController.create({
          message: 'Conectando con el servidor, por favor espere...',
          duration: 5000,
        });
        await loading.present();
        this.vehicleService.delete(id)
          .subscribe( async () => {
            await loading.dismiss();
            await this.updateData();
            const alert = await this.alertController.create({
              message: 'Se ha eliminado el vehiculo correctamente',
              buttons: ['OK']
            });
            await alert.present();
          }, async (error: any) => {
            const alert = await this.alertController.create({
              header: 'Algo ha fallado',
              message: error.error.message,
              buttons: ['OK'],
            });
            await alert.present();
          });
      }
}
