import { Module } from '@nestjs/common';
import { BankloanController } from './bankloan.controller';
import { BankloanService } from './bankloan.service';

@Module({
  controllers: [BankloanController],
  providers: [BankloanService]
})
export class BankloanModule {}
