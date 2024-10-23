import { PartialType } from '@nestjs/swagger';
import { CreateSubCateDto } from './create-sub_cate.dto';

export class UpdateSubCateDto extends PartialType(CreateSubCateDto) {}
