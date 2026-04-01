import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projet30Controller } from './projet30.controller';
import { Projet30Service } from './projet30.service';
import { Projet30 } from 'src/entities/projet30.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projet30])],
  controllers: [Projet30Controller],
  providers: [Projet30Service],
})
export class Projet30Module {}
