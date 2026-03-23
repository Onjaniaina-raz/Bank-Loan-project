import { PartialType } from '@nestjs/mapped-types';
import { CreateBanksDto } from './createBanks.dto';

export class UpdateBanksDto extends PartialType(CreateBanksDto) {}
