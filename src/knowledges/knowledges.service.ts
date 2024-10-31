import { Comment } from './../../node_modules/.prisma/client/index.d';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { PrismaService } from '../prisma.service';
import { saveFiletToBucket, deleteFileFormBucket } from './minio.config';

@Injectable()
export class KnowledgesService {
  private readonly logger: Logger;
  constructor(private prisma: PrismaService) {}

  async create(file: any, data: any): Promise<any> {
    const destinationObject = `file-${Date.now().toString()}`;

    if (file) {
      await saveFiletToBucket(file, destinationObject);
    }

    const path =
      'http://' +
      process.env.MINIO_ClIENT_ACCESS +
      ':' +
      process.env.MINIO_ClIENT_PORT +
      '/document/' +
      destinationObject;

    const bodyData: any = {
      title: data.title,
      description: data.description,
      content: data.content,
      type: data.type,
      path: path,
      group: data.group,
      tag: data.tag,
      sub_categoryId: data.sub_categoryId,
      userId: data.userId,
      // published : data.published
    };

    try {
      const result = await this.prisma.khowledge.create({ data: bodyData });

      return result;
    } catch (error) {
      await deleteFileFormBucket(destinationObject);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<any> {
    const knowledgeList = await this.prisma.khowledge.findMany({
      include: {
        comment: true,
      },
    });

    return knowledgeList.map((knowledge) => {
      const { comment } = knowledge;

      // Calculate the average rating from comments
      const avgRating =
        comment.length > 0
          ? comment.reduce((sum, { rating }) => sum + rating, 0) /
            comment.length
          : null;

      return {
        ...knowledge,
        avg_rating: avgRating, // Add the calculated average rating to the response
      };
    });
  }

  async findOne(search: string): Promise<any> {
    const knowledgeList = await this.prisma.khowledge.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search || '',
            },
          },
          {
            description: {
              contains: search || '',
            },
          },
          {
            content: {
              contains: search || '',
            },
          },
          {
            group: {
              contains: search || '',
            },
          },
        ],
        published: true,
      },
      include: {
        comment: true,
      },
    });

    return knowledgeList.map((knowledge) => {
      const { comment } = knowledge;

      // Calculate the average rating from comments
      const avgRating =
        comment.length > 0
          ? comment.reduce((sum, { rating }) => sum + rating, 0) /
            comment.length
          : null;

      return {
        ...knowledge,
        avg_rating: avgRating, // Add the calculated average rating to the response
      };
    });
  }

  async findById(id: string): Promise<any> {
    const knowledge = await this.prisma.khowledge.findFirst({
      where: {
        id: id,
        published: true,
      },
      include: {
        comment: {
          include : {
            User :true
          }
        },
      },
    });

    if (!knowledge) return null; // Return null if no knowledge is found

    // Calculate the average rating from comments
    const { comment } = knowledge;
    const avgRating =
      comment.length > 0
        ? comment.reduce((sum, { rating }) => sum + rating, 0) / comment.length
        : null;

    return {
      ...knowledge,
      avg_rating: avgRating, // Add the calculated average rating to the response
    };
  }

  update(id: number, updateKnowledgeDto: UpdateKnowledgeDto) {
    return `This action updates a #${id} knowledge`;
  }

  remove(id: number) {
    return `This action removes a #${id} knowledge`;
  }
}
