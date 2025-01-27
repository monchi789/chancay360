import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PopUp {
  @PrimaryGeneratedColumn()
  idPopUp: number;

  @Column({ type: 'text', array: true })
  images: string[];
}
