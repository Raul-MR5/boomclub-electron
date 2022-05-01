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

  async upload(nombre: string, file: any) {

    try {
      let respuesta = await this.storareRef.child("users/" + nombre).putString(file, 'data_url');
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }

  }
}