import { PartialType } from '@nestjs/mapped-types';
import { CreateProjet30Dto } from './createProjet30.dto';

export class UpdateProjet30Dto extends PartialType(CreateProjet30Dto) {}
