import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';

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

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  loan: number;
}
