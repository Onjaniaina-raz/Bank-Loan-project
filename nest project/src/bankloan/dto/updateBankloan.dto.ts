import { PartialType } from '@nestjs/mapped-types';
import { CreateBankloanDto } from './createBankloan.dto';

export class UpdateBankloanDto extends PartialType(CreateBankloanDto) {}
