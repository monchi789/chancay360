import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  idGallery: string;

  @Column({ type: 'text', array: true })
  image: string[];

  @Column({ type: 'text' })
  description: string;

  @Column({ type: Date, default: () => 'CURRENT_DATE' })
  publicationDate: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
