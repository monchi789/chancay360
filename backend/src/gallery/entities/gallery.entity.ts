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
  @PrimaryGeneratedColumn()
  idGallery: number;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: Date, default: () => 'CURRENT_DATE' })
  publicationDate: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
