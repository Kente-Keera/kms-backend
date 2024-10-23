import { Injectable } from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CatagoryService {
  constructor(private prisma: PrismaService) {}
 

  async create(createCateDto: any): Promise<any> {
    return this.prisma.category.create({ data: createCateDto });
  }

  async findAll(): Promise<any> {
    return this.prisma.category.findMany({
      where: {},
      include: {
        sub_cate: {
          include: {
            knowledge: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} catagory`;
  }

  update(id: number, updateCatagoryDto: UpdateCatagoryDto) {
    return `This action updates a #${id} catagory`;
  }

  remove(id: number) {
    return `This action removes a #${id} catagory`;
  }
}
