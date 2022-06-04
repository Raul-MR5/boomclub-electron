import { Injectable } from '@angular/core';
import { Cancion } from '../../shared/models/cancion.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore'

@Injectable({
    providedIn: 'root'
})
export class CancionService {

    cancion: Cancion;
    canciones: Cancion[];
    private cancionSubject: BehaviorSubject<Cancion> = new BehaviorSubject(null);
    public readonly cancionActual: Observable<Cancion> = this.cancionSubject.asObservable();

    audio: HTMLAudioElement;

    constructor(
        private firestore: AngularFirestore,
        private usuarioSrv: UsuarioService
    ) { }

    getAll(): Observable<Cancion[]> {
        return this.firestore.collection<Cancion>('cancion').valueChanges({ idField: 'id' });
    }

    getAllMatches(match: string): Observable<Cancion[]> {
        return this.firestore.collection<Cancion>('cancion', ref => ref.orderBy('titulo').startAt(match).endAt(match + "\uf8ff")).valueChanges({ idField: 'id' });
    }

    getAllByDate(): Observable<Cancion[]> {
        return this.firestore.collection<Cancion>('cancion', ref => ref.orderBy('fecha', 'desc')).valueChanges({ idField: 'id' });
    }

    getFriendsMusic(): Observable<Cancion[]> {
        let user = this.usuarioSrv.getUsuario();

        console.log(user.seguidos, user.seguidos.length);

        if (user.seguidos && user.seguidos.length > 0) {
            console.log("friends");

            return this.firestore.collection<Cancion>('cancion', ref => ref.where('usuario.id', 'in', user.seguidos).orderBy('usuario.id').orderBy('fecha', 'desc').limit(4)).valueChanges();
        }

        return new Observable(() => null)
    }

    getNewsMusic(): Observable<Cancion[]> {
        let user = this.usuarioSrv.getUsuario();

        console.log(user.seguidos, user.seguidos.length);


        if (user.seguidos && user.seguidos.length > 0) {
            console.log("entra");

            return this.firestore.collection<Cancion>('cancion', ref => ref.where('usuario.id', 'not-in', user.id).where('usuario.id', 'not-in', user.seguidos).orderBy('usuario.id').orderBy('fecha', 'desc').limit(4)).valueChanges();
        } else {
            return this.firestore.collection<Cancion>('cancion', ref => ref.where('usuario.id', '!=', user.id).orderBy('usuario.id').orderBy('fecha', 'desc').limit(4)).valueChanges();
        }


    }

    getUserMusic(user: Usuario): Observable<Cancion[]> {
        return this.firestore.collection<Cancion>('cancion', ref => ref.where('usuario.id', '==', user.id)).valueChanges();
    }

    getOne(id: string): Observable<Cancion> {
        return this.firestore.collection<Cancion>('cancion').doc(id).valueChanges({ idField: 'id' });
    }

    setSong(cancionActual: Cancion): void {
        this.cancion = cancionActual;
        console.log(this.cancion);
        
        this.cancionSubject.next(cancionActual);
    }

    setPlaylist(canciones: Cancion[]): void {
        this.canciones = canciones;
        this.setSong(this.canciones[0]);
    }

    liked(song: Cancion): boolean {
        let usuario = this.usuarioSrv.getUsuario()
        if (song.likes) {
            console.log("entra");

            for (let i = 0; i < song.likes.length; i++) {
                console.log(song.likes[i], song.id);

                if (song.likes[i] == usuario.id) {
                    return true;
                }
            }
        }

        return false;
    }

    async newLike(id: string, usuario: Usuario) {
        try {
            const res = await this.firestore.collection('cancion').doc(id).update({ likes: arrayUnion(usuario.id) });

            return res;
        } catch (err) {
            return err;
        }
    }

    async removeLike(id: string, usuario: Usuario) {
        try {
            const res = await this.firestore.collection('cancion').doc(id).update({ likes: arrayRemove(usuario.id) });

            return res;
        } catch (err) {
            return err;
        }
    }

    playSong(audio: HTMLAudioElement) {
        this.audio = audio;
        this.audio.play();
    }

    pauseSong() {
        if (this.audio) {
            console.log(this.audio);

            this.audio.pause();
        }
    }

    resetSong() {
        this.setSong(this.cancion);
    }

    previousSong() {        
        if (this.cancion.position) {            
            if (this.cancion.position > 1) {
                this.setSong(this.canciones[this.cancion.position - 2]);
            } else {
                this.setSong(this.canciones[this.canciones.length - 1]);
            }
        } else {
            this.setSong(this.cancion);
        }
    }

    nextSong() {
        if (this.cancion.position) {
            if (this.cancion.position < this.canciones.length) {
                this.setSong(this.canciones[this.cancion.position]);
            } else {
                this.setSong(this.canciones[0]);
            }
        } else {
            this.setSong(this.cancion);
        }
    }

    cleanSong() {
        this.cancionSubject.next(null);
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
