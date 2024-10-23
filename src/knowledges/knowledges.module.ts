import { Module } from '@nestjs/common';
import { KnowledgesService } from './knowledges.service';
import { KnowledgesController } from './knowledges.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KnowledgesController],
  providers: [KnowledgesService,PrismaService],
})
export class KnowledgesModule {}
