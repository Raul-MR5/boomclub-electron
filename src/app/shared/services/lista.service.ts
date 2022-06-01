import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';
import { Cancion } from '../models/cancion.model';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore'

@Injectable({
    providedIn: 'root'
})
export class ListaService {

    listas: Observable<Lista[]>;

    constructor(private firestore: AngularFirestore) {
    }

    getAll(): Observable<Lista[]> {
        return this.firestore.collection<Lista>('lista').valueChanges({ idField: 'id' });
    }

    getOne(id: string): Observable<Lista> {
        return this.firestore.collection<Lista>('lista').doc(id).valueChanges({ idField: 'id' });
    }

    getUserPlaylist(user: Usuario): Observable<Lista[]> {
        return this.firestore.collection<Lista>('lista', ref => ref.where('usuario.id', '==', user.id)).valueChanges();
    }

    async addSong(id: string, cancion: Cancion) {
        try {
            const res = await this.firestore.collection('lista').doc(id).update({ canciones: arrayUnion(cancion.id) });

            return res;
        } catch (err) {
            return err;
        }
    }

    async create(payload: Lista): Promise<any> {
        try {
            // const id = this.firestore.createId();
            // const data = {id, ...payload};

            console.log(payload);
            

            // const res = await this.firestore.collection('lista').add({ ...payload });
            const res = await this.firestore.collection('lista').doc(payload.id).set(payload);
            return res;
        } catch (err) {
            return err;
        }
    }

    async update(lista: Lista) {
        try {
            const res = await this.firestore.collection('lista').doc(lista.id).update({ ...lista });

            return res;
        } catch (err) {
            return err;
        }
    }

    async delete(id: string) {
        try {
            const res = await this.firestore.collection('lista').doc(id).delete();

            return res;
        } catch (err) {
            return err;
        }
    }
}
