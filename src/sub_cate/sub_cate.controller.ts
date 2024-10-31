import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubCateService } from './sub_cate.service';
import { CreateSubCateDto } from './dto/create-sub_cate.dto';
import { UpdateSubCateDto } from './dto/update-sub_cate.dto';

@Controller('sub-cate')
export class SubCateController {
  constructor(private readonly subCateService: SubCateService) {}

  @Post('create')
  create(@Body() createSubCateDto: any) {
    return this.subCateService.create(createSubCateDto);
  }

  @Get()
  findAll() {
    return this.subCateService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query()
    key: {
      rate: number;
    },
  ) {
    return this.subCateService.findOne(id,key.rate);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubCateDto: UpdateSubCateDto) {
    return this.subCateService.update(+id, updateSubCateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCateService.remove(+id);
  }
}
