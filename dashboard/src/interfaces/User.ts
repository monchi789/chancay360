export interface User {
  idUser: string;
  user: string;
  name: string;
  lastName: string;
  email: string;
  rol: Rol;
  googleId: string | null;
  avatar: string | null;
  password?: string | null;
}

export enum Rol {
  ADMIN = 'ADMIN',
  CREADOR_CONTENIDO = 'CREADOR_CONTENIDO',
  GESTOR_CLIENTES = 'GESTOR_CLIENTES',
  USUARIO = 'USUARIO',
}
