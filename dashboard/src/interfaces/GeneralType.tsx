export interface GeneralType {
  idGeneralType?: string;
  code:          string;
  name:          string;
  description:   string;
  type:          string;
  active:        boolean;
}

export enum Type {
  ROLE = 'ROL',
  PUBLICATION = 'PUBLICACION',
  NEWS = 'NOTICIA',
  EVENT = 'EVENTO',
  MAGAZINE = 'REVISTA',
}
