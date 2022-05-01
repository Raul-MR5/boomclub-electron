import { Injectable } from '@angular/core';
import { Cancion } from '../../shared/models/cancion.model';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class CancionService {

    canciones: Observable<Cancion[]>;

    constructor(private firestore: AngularFirestore) {
    }

    getAll(): Observable<Cancion[]> {
        return this.firestore.collection<Cancion>('cancion').valueChanges({ idField: 'id' });
    }

    getOne(id: string): Observable<Cancion> {
        return this.firestore.collection<Cancion>('cancion').doc(id).valueChanges({ idField: 'id' });
    }

    async create(payload: Cancion): Promise<any> {
        try {
            // const id = this.firestore.createId();
            // const data = {id, ...payload};

            console.log(payload);
            

            // const res = await this.firestore.collection('cancion').add({ ...payload });
            const res = await this.firestore.collection('cancion').doc(payload.id).set(payload);
            return res;
        } catch (err) {
            return err;
        }
    }

    async update(cancion: Cancion) {
        try {
            const res = await this.firestore.collection('cancion').doc(cancion.id).update({ ...cancion });

            return res;
        } catch (err) {
            return err;
        }
    }

    async delete(id: string) {
        try {
            const res = await this.firestore.collection('cancion').doc(id).delete();

            return res;
        } catch (err) {
            return err;
        }
    }
}
