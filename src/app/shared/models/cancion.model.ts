import { Usuario } from './usuario.model';

export interface Cancion {
    id?: string;
    usuario: Usuario;
    duracion: number;
    foto?: any;
}