import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'int', nullable: true })
  minLoanAmount: number;

  @Column({ type: 'int', nullable: true })
  maxLoanAmount: number;

  @Column({ type: 'int', nullable: true })
  maxLoanTermMonths: number;
}
