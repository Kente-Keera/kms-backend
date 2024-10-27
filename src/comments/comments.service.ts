import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async create(createGroupDto: any): Promise<any> {
    return this.prisma.comment.create({ data: createGroupDto });
  }

  async findAll(): Promise<any> {
    return this.prisma.comment.findMany({
      where: {},
      include: {
        User: true,
        Khowledge: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
