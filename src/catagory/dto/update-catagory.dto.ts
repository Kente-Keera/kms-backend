import { PartialType } from '@nestjs/swagger';
import { CreateCatagoryDto } from './create-catagory.dto';

export class UpdateCatagoryDto extends PartialType(CreateCatagoryDto) {}
