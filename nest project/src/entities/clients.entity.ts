import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
