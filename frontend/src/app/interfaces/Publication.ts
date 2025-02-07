export interface Publication {
  idPublication?: string;
  author: string;
  title: string;
  content: string;
  cover?: string[];
  publicationDate: Date;
  category: string;
  file?: string[];
  createAt: Date;
  updateAt: Date;
  deleteAt?: Date;
}
export enum CATEGORY {
  "Noticias",
  "Inversiones y Desarrollo",
  "Proyectos Destacados",
  "Eventos y Conferencias",
  "Educación y Capacitación",
}
