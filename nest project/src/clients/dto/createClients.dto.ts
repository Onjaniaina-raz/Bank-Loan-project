import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator';

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

  @IsBoolean()
  isBlacklisted: boolean;
}
