import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateProjet30Dto {
  @IsString()
  client: string;

  @IsInt()
  account_number: number;

  @IsString()
  bank: string;

  @IsInt()
  @Min(0)
  amount: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  loan: number;
}
