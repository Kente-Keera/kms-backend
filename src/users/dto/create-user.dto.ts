import { $Enums } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  f_name: string;

  @IsNotEmpty()
  l_name: string;

  @IsNotEmpty()
  tel: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: $Enums.Role;

  @IsNotEmpty()
  published: boolean;
}
