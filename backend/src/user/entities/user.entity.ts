import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from '../../shared/enums/rol.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  user?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ type: 'text', nullable: true, select: false })
  password?: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', default: Rol.USUARIO, enum: Rol })
  rol: string;

  @Column({ type: 'text', nullable: true })
  googleId?: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
