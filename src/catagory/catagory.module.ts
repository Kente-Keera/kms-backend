import { Module } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CatagoryController } from './catagory.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CatagoryController],
  providers: [CatagoryService,PrismaService],
})
export class CatagoryModule {}
