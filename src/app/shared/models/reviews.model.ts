import { Usuario } from './usuario.model';
import { Cancion } from './cancion.model';

export interface Reviews {
    id?: string;
    usuario: Usuario;
    cancion: Cancion;
    texto: string;
    like: boolean;
}