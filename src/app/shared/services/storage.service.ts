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
    try {
      let respuesta = await this.storareRef.child(carpeta + "/" + nombre + ".png").putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      return null;
    }

  }

  async uploadMusic(user: string, nombre: string, file: any) {
    try {
      let respuesta = await this.storareRef.child("canciones/" + user + "/" + nombre + ".mp3").put(file);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      return null;
    }
  }
}