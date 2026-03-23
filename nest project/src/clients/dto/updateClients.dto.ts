import { PartialType } from '@nestjs/mapped-types';
import { CreateClientsDto } from './createClients.dto';

export class UpdateClientsDto extends PartialType(CreateClientsDto) {}
