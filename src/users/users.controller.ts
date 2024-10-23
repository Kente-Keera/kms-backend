import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User as UserModel } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body()
    userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.usersService.create(userData);
  }

  @Get('email')
  async findByEmail(
    @Query()
    key: {
      email: string;
    },
  ): Promise<UserModel> {
    return this.usersService.findByEmail(key.email);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(): Promise<any> {
    return {
      test: 'asdasd',
      test2: 'asdasd',
    };
  }
}
