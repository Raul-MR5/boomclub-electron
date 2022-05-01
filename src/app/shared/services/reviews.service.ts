import { Injectable } from '@angular/core';
import { Reviews } from '../models/reviews.model';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    reviews: Observable<Reviews[]>;

    constructor(private firestore: AngularFirestore) {
    }

    getAll(): Observable<Reviews[]> {
        return this.firestore.collection<Reviews>('reviews').valueChanges({ idField: 'id' });
    }

    getOne(id: string): Observable<Reviews> {
        return this.firestore.collection<Reviews>('reviews').doc(id).valueChanges({ idField: 'id' });
    }

    async create(payload: Reviews): Promise<any> {
        try {
            // const id = this.firestore.createId();
            // const data = {id, ...payload};

            console.log(payload);
            

            // const res = await this.firestore.collection('reviews').add({ ...payload });
            const res = await this.firestore.collection('reviews').doc(payload.id).set(payload);
            return res;
        } catch (err) {
            return err;
        }
    }

    async update(reviews: Reviews) {
        try {
            const res = await this.firestore.collection('reviews').doc(reviews.id).update({ ...reviews });

            return res;
        } catch (err) {
            return err;
        }
    }

    async delete(id: string) {
        try {
            const res = await this.firestore.collection('reviews').doc(id).delete();

            return res;
        } catch (err) {
            return err;
        }
    }
}
