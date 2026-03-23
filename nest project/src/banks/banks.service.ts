import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banks } from 'src/entities/banks.entity';
import { Repository } from 'typeorm';
import { CreateBanksDto } from './dto/createBanks.dto';
import { UpdateBanksDto } from './dto/updateBanks.dto';

@Injectable()
export class BanksService {
  constructor(@InjectRepository(Banks) private banksRepo: Repository<Banks>) {}

  async findAll() {
    return this.banksRepo.find();
  }

  async findById(id: number) {
    const bank = await this.banksRepo.findOne({
      where: {
        id,
      },
    });

    if (!bank) throw new NotFoundException();
    return bank;
  }

  async create(dto: CreateBanksDto) {
    return await this.banksRepo.save(dto);
  }

  async update(id: number, dto: UpdateBanksDto) {
    return await this.banksRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.banksRepo.delete(id);
  }
}
