import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: any): Promise<any> {
    return this.prisma.group.create({ data: createGroupDto });
  }

  async findAll(): Promise<any> {
    return this.prisma.group.findMany({
      where: {},
      include: {
        cate: {
          include: {
            sub_cate: {
              include: {
                knowledge: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
