import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/models/usuario.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore'

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;

    constructor(private firestore: AngularFirestore) {

    }


    getAll(): Observable<Usuario[]> {
        return this.firestore.collection<Usuario>('usuario').valueChanges({ idField: 'id' });
    }

    getOne(id: string): Observable<Usuario> {
        return this.firestore.collection<Usuario>('usuario').doc(id).valueChanges({ idField: 'id' });
    }

    setUsuario(payload: Usuario) {
        this.usuario = payload;
        console.log(this.usuario);
    }

    getUsuario(): Usuario {
        return this.usuario;
    }

    followed(user: Usuario): boolean {
        if (this.usuario.id != user.id) {
            if (this.usuario.seguidos) {
                console.log("entra");

                for (let i = 0; i < this.usuario.seguidos.length; i++) {
                    console.log(this.usuario.seguidos[i], user.id);

                    if (this.usuario.seguidos[i] == user.id) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    async newFollow(id: string, usuario: Usuario) {
        try {
            const res = await this.firestore.collection('usuario').doc(id).update({ seguidos: arrayUnion(usuario.id) });

            return res;
        } catch (err) {
            return err;
        }
    }

    async removeFollow(id: string, usuario: Usuario) {
        try {
            const res = await this.firestore.collection('usuario').doc(id).update({ seguidos: arrayRemove(usuario.id) });

            return res;
        } catch (err) {
            return err;
        }
    }

    async create(payload: Usuario): Promise<any> {
        try {
            // const id = this.firestore.createId();
            // const data = {id, ...payload};

            console.log(payload);


            // const res = await this.firestore.collection('usuario').add({ ...payload });
            const res = await this.firestore.collection('usuario').doc(payload.id).set(payload);
            return res;
        } catch (err) {
            return err;
        }
    }

    async update(usuario: Usuario) {
        try {
            const res = await this.firestore.collection('usuario').doc(usuario.id).update({ ...usuario });

            return res;
        } catch (err) {
            return err;
        }
    }

    async delete(id: string) {
        try {
            const res = await this.firestore.collection('usuario').doc(id).delete();

            return res;
        } catch (err) {
            return err;
        }
    }
}
