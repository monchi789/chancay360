import { Request } from 'express';

export interface RequestWithUserInterface extends Request {
  user: {
    email: string;
    user: string;
    name: string;
    lastName: string;
    rol: string;
  };
}
