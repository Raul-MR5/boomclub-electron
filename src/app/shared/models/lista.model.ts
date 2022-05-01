import { Usuario } from "./usuario.model";
import { Cancion } from "./cancion.model";

export interface Lista {
    id?: string;
    usuario: Usuario;
    canciones?: Cancion[];
    nCanciones?: number;
    foto: any; 
}