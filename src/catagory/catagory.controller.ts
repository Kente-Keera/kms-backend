import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatagoryService } from './catagory.service';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';

@Controller('category')
export class CatagoryController {
  constructor(private readonly catagoryService: CatagoryService) {}

  @Post("create")
  create(@Body() createCatagoryDto: any) {
    return this.catagoryService.create(createCatagoryDto);
  }

  @Get()
  findAll() {
    return this.catagoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catagoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatagoryDto: UpdateCatagoryDto) {
    return this.catagoryService.update(+id, updateCatagoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catagoryService.remove(+id);
  }
}
