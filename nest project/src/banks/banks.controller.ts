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
import { BanksService } from './banks.service';
import { CreateBanksDto } from './dto/createBanks.dto';
import { IdParamDto } from './dto/idParam.dto';
import { UpdateBanksDto } from './dto/updateBanks.dto';

@Controller('banks')
export class BanksController {
  constructor(private banksService: BanksService) {}

  @Get()
  findAll() {
    return this.banksService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id) {
    return this.banksService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateBanksDto) {
    return this.banksService.create(dto);
  }

  @Patch(':id')
  update(@Body() body: UpdateBanksDto, @Param() { id }: IdParamDto) {
    return this.banksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.banksService.delete(id);
  }
}
