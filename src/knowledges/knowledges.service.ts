import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { PrismaService } from '../prisma.service';
import { saveFiletToBucket, deleteFileFormBucket } from './minio.config';
import { config } from 'dotenv';

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
    return this.prisma.khowledge.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} knowledge`;
  }

  update(id: number, updateKnowledgeDto: UpdateKnowledgeDto) {
    return `This action updates a #${id} knowledge`;
  }

  remove(id: number) {
    return `This action removes a #${id} knowledge`;
  }
}
