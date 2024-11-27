import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  idPublication: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true, type: 'text', array: true })
  cover: string[];

  @Column({ type: Date, default: () => 'CURRENT_DATE' })
  publicationDate: Date;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ nullable: true, type: 'text', array: true })
  file?: string[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
