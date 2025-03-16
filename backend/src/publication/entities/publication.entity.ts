import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PublicationCategory } from '../../shared/enums/publicationCategory.enum';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', array: true })
  cover: string[];

  @Column({ type: 'text', array: true })
  files: string[];

  @Column({ type: 'enum', enum: PublicationCategory })
  category: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  publicationDate: Date;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
