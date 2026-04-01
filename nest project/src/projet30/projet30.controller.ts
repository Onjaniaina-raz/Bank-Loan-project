import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjet30Dto } from './dto/createProjet30.dto';
import { IdParamDto } from './dto/idParam.dto';
import { UpdateProjet30Dto } from './dto/updateProjet30.dto';
import { Projet30Service } from './projet30.service';

@Controller('projet30')
export class Projet30Controller {
  constructor(private projetService: Projet30Service) {}

  @Get()
  findAll() {
    return this.projetService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id) {
    return this.projetService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateProjet30Dto) {
    return this.projetService.create(dto);
  }

  @Patch(':id')
  update(@Body() body: UpdateProjet30Dto, @Param() { id }: IdParamDto) {
    return this.projetService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.projetService.delete(id);
  }
}
