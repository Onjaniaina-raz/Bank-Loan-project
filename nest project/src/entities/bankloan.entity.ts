import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clients } from './clients.entity';
import { Banks } from './banks.entity';

@Entity()
export class Bankloan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loan: number;

  @OneToOne(() => Clients, (clients) => clients.bankloan)
  @JoinColumn()
  clients: Clients;

  @OneToOne(() => Banks, (banks) => banks.bankloan)
  @JoinColumn()
  banks: Banks;
}
