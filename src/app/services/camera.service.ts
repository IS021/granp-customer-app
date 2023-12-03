import { Injectable } from '@angular/core';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  imageSelected = false;
  profilePicture!: string;

  constructor() { }

  public async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
    return this.profilePicture = 'data:image/jpeg;base64,' + image.base64String;
  }
}
