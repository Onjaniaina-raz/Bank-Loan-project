import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projet30 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column({ type: 'int' })
  account_number: number;

  @Column()
  bank: string;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', scale: 2, precision: 10 })
  loan: number;
}
