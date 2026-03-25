import { IsNumber } from 'class-validator';

export class CreateBankloanDto {
  @IsNumber()
  loan: number;
}
