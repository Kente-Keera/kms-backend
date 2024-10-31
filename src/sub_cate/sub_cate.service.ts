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

  async findOne(id: string, rate: number): Promise<any> {
    // Fetch the sub-category along with knowledge and comments
    const subCategory = await this.prisma.sub_category.findUnique({
      where: { id },
      include: {
        knowledge: {
          include: {
            comment: true,
          },
        },
      },
    });

    // Check if the sub-category exists
    if (subCategory && subCategory.knowledge) {
      // Map through knowledge items to calculate average rating
      const filteredKnowledge = subCategory.knowledge
        .map((knowledgeItem) => {
          const comments = knowledgeItem.comment;
          const averageRating =
            comments.length > 0
              ? comments.reduce((sum, comment) => sum + comment.rating, 0) /
                comments.length
              : 0;

          return {
            ...knowledgeItem,
            avg_rating: averageRating,
          };
        })
        .filter((knowledgeItem) => knowledgeItem.avg_rating >= rate); // Filter based on avg_rating

      // Replace original knowledge with filtered knowledge
      subCategory.knowledge = filteredKnowledge;
    }

    return subCategory;
  }

  update(id: number, updateSubCateDto: UpdateSubCateDto) {
    return `This action updates a #${id} subCate`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCate`;
  }
}
