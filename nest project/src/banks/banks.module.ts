import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banks } from 'src/entities/banks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banks])],
  controllers: [BanksController],
  providers: [BanksService],
})
export class BanksModule {}
