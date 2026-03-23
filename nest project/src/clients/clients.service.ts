import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from 'src/entities/clients.entity';
import { Repository } from 'typeorm';
import { CreateClientsDto } from './dto/createClients.dto';
import { UpdateClientsDto } from './dto/updateClients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients) private clientsRepo: Repository<Clients>,
  ) {}

  async findAll() {
    return this.clientsRepo.find();
  }

  async findById(id: number) {
    const client = await this.clientsRepo.findOne({
      where: {
        id,
      },
    });

    if (!client) throw new NotFoundException();
    return client;
  }

  async create(dto: CreateClientsDto) {
    return await this.clientsRepo.save(dto);
  }

  async update(id: number, dto: UpdateClientsDto) {
    return await this.clientsRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.clientsRepo.delete(id);
  }
}
