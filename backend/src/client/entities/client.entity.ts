import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  idClient: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  enterprise: string;

  @Column({ type: 'varchar' })
  position: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'boolean', default: false })
  authorized?: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
