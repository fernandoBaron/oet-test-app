import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  server = environment.SERVER;
  URL = '/app/users';

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private transfer: FileTransfer) { }

  passwordChange(oldPassword: string, newPassword: string) {
    return this.httpClient.post(`${ this.server }${this.URL}/passwordChange`, { oldPassword, newPassword });
  }
  setLocation(latitude: number, longitude: number) {
    return this.httpClient.post(`${ this.server }${this.URL}/setLocation`, {latitude, longitude});
  }

  getUser() {
    return this.httpClient.post(`${ this.server }${this.URL}/show`, {});
  }

  frontPicture(fileName: any, filePath: any) {

    const url = `${this.server}${this.URL}/uploadFrontDocumentImage`;
    const token = this.authService.getToken();
      const options: FileUploadOptions = {
        fileName: fileName,
        fileKey: 'fileName',
        chunkedMode: false,
        mimeType: 'multipart/form-data',
        headers: {
          token
        },
      };
      const fileTransfer: FileTransferObject = this.transfer.create();
      return fileTransfer.upload(filePath, url, options);
  }

  backPicture(fileName: any, filePath: any) {

    const url = `${this.server}${this.URL}/uploadBackDocumentImage`;
    const token = this.authService.getToken();
      const options: FileUploadOptions = {
        fileName: fileName,
        fileKey: 'fileName',
        chunkedMode: false,
        mimeType: 'multipart/form-data',
        headers: {
          token
        },
      };
      const fileTransfer: FileTransferObject = this.transfer.create();
      return fileTransfer.upload(filePath, url, options);
  }
}
