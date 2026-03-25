import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bankloan } from './bankloan.entity';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'bigint' })
  cin: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ type: 'boolean', default: false })
  isBlacklisted: boolean;

  @OneToOne(() => Bankloan, (bankloan) => bankloan.clients)
  bankloan: Bankloan;
}
