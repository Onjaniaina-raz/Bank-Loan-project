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
import { CreateClientsDto } from './dto/createClients.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ClientsService } from './clients.service';
import { UpdateClientsDto } from './dto/updateClients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id) {
    return this.clientsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateClientsDto) {
    return this.clientsService.create(dto);
  }

  @Patch(':id')
  update(@Body() body: UpdateClientsDto, @Param() { id }: IdParamDto) {
    return this.clientsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.clientsService.delete(id);
  }
}
