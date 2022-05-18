export interface Usuario {
    id?: string;
    username: string;
    password?: string;
    nombre: string;
    apellidos: string;
    email: string;
    foto?: any;
    seguidos?: string[];
}