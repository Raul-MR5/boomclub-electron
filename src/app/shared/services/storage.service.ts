import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

// firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  storareRef = firebase.app().storage().ref();

  constructor() { }

  async uploadImg(carpeta: string, nombre: string, imgBase64: any) {
    console.log(imgBase64);

    try {
      let respuesta = await this.storareRef.child(carpeta + "/" + nombre + ".png").putString(imgBase64, 'data_url');
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }

  }

  async uploadMusic(user: string, nombre: string, file: any) {
    console.log(file);

    try {
      let respuesta = await this.storareRef.child("canciones/" + user + "/" + nombre + ".mp3").put(file);
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }

  }
}