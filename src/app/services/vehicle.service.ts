import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { VehicleInterface } from '../interfaces/vehicle.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  server = environment.SERVER;
  URL = '/app/vehicles';

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private transfer: FileTransfer) { }

  showAll() {
    return this.httpClient.get(`${ this.server }${this.URL}/`);
  }

  add(vehicle: VehicleInterface) {
    const url = `${this.server}${this.URL}/add`;
    const token = this.authService.getToken();
      const options: FileUploadOptions = {
        fileName: vehicle.fileName,
        fileKey: 'fileName',
        chunkedMode: false,
        mimeType: 'multipart/form-data',
        params: { vehicle },
        headers: {
          token
        },
      };
      const fileTransfer: FileTransferObject = this.transfer.create();
      return fileTransfer.upload(vehicle.filePath, url, options);
  }

  show(vehicleId: number) {
    return this.httpClient.post(`${ this.server }${this.URL}/add`, {vehicleId});
  }

  delete(vehicleId: number) {
    return this.httpClient.post(`${ this.server }${this.URL}/${vehicleId}/delete`, {});
  }

}
