import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    comments: Observable<Comment[]>;

    constructor(private firestore: AngularFirestore) {
    }

    getAll(): Observable<Comment[]> {
        return this.firestore.collection<Comment>('comments').valueChanges({ idField: 'id' });
    }

    getSongComments(id: string): Observable<Comment[]> {
        return this.firestore.collection<Comment>('comments', ref => ref.where('cancion.id', '==', id)).valueChanges({ idField: 'id' });
    }

    getOne(id: string): Observable<Comment> {
        return this.firestore.collection<Comment>('comments').doc(id).valueChanges({ idField: 'id' });
    }

    async create(payload: Comment): Promise<any> {
        try {
            // const id = this.firestore.createId();
            // const data = {id, ...payload};

            console.log(payload);
            

            // const res = await this.firestore.collection('comments').add({ ...payload });
            const res = await this.firestore.collection('comments').doc(payload.id).set(payload);
            return res;
        } catch (err) {
            return err;
        }
    }

    async update(comments: Comment) {
        try {
            const res = await this.firestore.collection('comments').doc(comments.id).update({ ...comments });

            return res;
        } catch (err) {
            return err;
        }
    }

    async delete(id: string) {
        try {
            const res = await this.firestore.collection('comments').doc(id).delete();

            return res;
        } catch (err) {
            return err;
        }
    }
}
