/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateClientsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @IsPositive()
  cin: number;

  @IsString()
  address: string;

  @IsString()
  phone: string;
}
