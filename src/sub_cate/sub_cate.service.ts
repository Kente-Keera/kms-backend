import { Injectable } from '@nestjs/common';
import { CreateSubCateDto } from './dto/create-sub_cate.dto';
import { UpdateSubCateDto } from './dto/update-sub_cate.dto';

import { PrismaService } from '../prisma.service';

@Injectable()
export class SubCateService {
  constructor(private prisma: PrismaService) {}

  async create(createSubCateDto: any): Promise<any> {
    return this.prisma.sub_category.create({ data: createSubCateDto });
  }

  async findAll(): Promise<any> {
    return this.prisma.sub_category.findMany({
      where: {},
      include: {
        knowledge: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} subCate`;
  }

  update(id: number, updateSubCateDto: UpdateSubCateDto) {
    return `This action updates a #${id} subCate`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCate`;
  }
}
