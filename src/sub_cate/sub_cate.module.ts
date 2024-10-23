import { Module } from '@nestjs/common';
import { SubCateService } from './sub_cate.service';
import { SubCateController } from './sub_cate.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SubCateController],
  providers: [SubCateService, PrismaService],
})
export class SubCateModule {}
