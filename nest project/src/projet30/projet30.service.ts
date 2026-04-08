import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projet30 } from 'src/entities/projet30.entity';
import { Repository } from 'typeorm';
import { CreateProjet30Dto } from './dto/createProjet30.dto';
import { UpdateProjet30Dto } from './dto/updateProjet30.dto';

@Injectable()
export class Projet30Service {
  constructor(
    @InjectRepository(Projet30) private projetRepo: Repository<Projet30>,
  ) {}

  async findAll() {
    return this.projetRepo.find();
  }

  async findById(id: number) {
    const loan = await this.projetRepo.findOne({
      where: {
        id,
      },
    });

    if (!loan) throw new NotFoundException();
    return loan;
  }

  async create(dto: CreateProjet30Dto) {
    return await this.projetRepo.save(dto);
  }

  async update(id: number, dto: UpdateProjet30Dto) {
    return await this.projetRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.projetRepo.delete(id);
  }
}
