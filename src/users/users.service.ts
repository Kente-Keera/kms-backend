import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

export type User = any;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async create(data: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const validateEmail = await this.findByEmail(data.email);
    if (validateEmail) {
      throw new HttpException(
        { message: 'Email already exists' },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.prisma.user.create({
        data: {
          password: hashPassword,
          f_name: data.f_name,
          l_name: data.l_name,
          tel: data.tel,
          email: data.email,
          role: data.role,
          published: data.published,
        },
      });
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
