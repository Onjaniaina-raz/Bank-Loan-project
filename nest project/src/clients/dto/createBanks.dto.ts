import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateBanksDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsInt()
  @IsPositive()
  interestRate: number;

  @IsInt()
  @IsPositive()
  minLoanAmount: number;

  @IsInt()
  @IsPositive()
  maxLoanAmount: number;

  @IsInt()
  @IsPositive()
  maxLoanTermMonths: number;
}
