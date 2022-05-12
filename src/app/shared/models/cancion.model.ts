import { Usuario } from './usuario.model';

export interface Cancion {
    id?: string;
    usuario: Usuario;
    titulo: string;
    lyrics: string;
    foto?: string;
    cancion: string;
}