import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { KnowledgesService } from './knowledges.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('knowledges')
export class KnowledgesController {
  constructor(private readonly knowledgesService: KnowledgesService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() createKnowledgeDto: any,
  ) {
    return this.knowledgesService.create(file, createKnowledgeDto);
  }

  @Get()
  findAll() {
    return this.knowledgesService.findAll();
  }

  @Get('search')
  findOne(@Query('keyword') search: string) {
    return this.knowledgesService.findOne(search);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.knowledgesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKnowledgeDto: UpdateKnowledgeDto,
  ) {
    return this.knowledgesService.update(+id, updateKnowledgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knowledgesService.remove(+id);
  }
}
