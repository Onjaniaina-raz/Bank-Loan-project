import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bankloan } from './bankloan.entity';

@Entity()
export class Banks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ type: 'int' })
  interestRate: number;

  @Column({ type: 'bigint', nullable: true })
  minLoanAmount: number;

  @Column({ type: 'bigint', nullable: true })
  maxLoanAmount: number;

  @Column({ type: 'int', nullable: true })
  maxLoanTermMonths: number;

  @OneToOne(() => Bankloan, (bankloan) => bankloan.banks)
  bankloan: Bankloan;
}
