import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(body: CreateAuthDto): Promise<any> {
    const validUser = await this.usersService.findByEmail(body.username);

    if (!validUser) {
      throw new HttpException(
        { message: 'Email or Password Incorrect' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const verifyPassword = await bcrypt.compare( body.password, validUser?.password,
    );

    if (!verifyPassword) {
      throw new HttpException(
        { message: 'Email or Password Incorrect' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!validUser.published) {
      throw new HttpException(
        { message: 'Your account has been deactivated!' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {
      username: body.username,
      sub: validUser?.id,
      roles: validUser?.role,
    };

    const access_token = this.jwtService.sign(payload);
    const refersh_token = this.jwtService.sign(
      payload,
      this.refreshTokenConfig,
    );

    return {
      user: {
        id: validUser?.id,
        username: validUser?.f_name + ' ' + validUser?.l_name,
        email: validUser?.email,
        phone: validUser?.tel,

        role: validUser?.role,
      },
      access_token,
      refersh_token,
    };
  }

  async refreshToken(user: any) {
    const payload = { username: user.username, sub: user.userId };

    const access_token = this.jwtService.sign(payload);
    return {
      user: user,
      access_token,
    };
  }
}
