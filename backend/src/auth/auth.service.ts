import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = parseInt(process.env.SALT);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, lastName, password, user, email }: RegisterDto) {
    const username = await this.userService.findByEmail(email);

    if (username) {
      throw new BadRequestException('User with that email is registered');
    }

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    await this.userService.create({
      user,
      email,
      password: hashedPassword,
      name,
      lastName,
    });

    const savedUser = await this.userService.findByEmailWithPassword(email);
    if (savedUser?.password !== hashedPassword) {
      console.error('Password is not equal');
    }

    return {
      user,
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Credentials not valid');
    }

    try {
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new UnauthorizedException('Credentials invalid');
      }
    } catch {
      throw new UnauthorizedException(
        'Error with verification of the credentials',
      );
    }

    // Generate the tokens
    const payload = {
      email: user.email,
      rol: user.rol,
      id: user.idUser,
      user: user.user,
    };

    return await this.generateJwt(payload);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });

      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = await this.jwtService.signAsync(
        { email: user.email, rol: user.rol, id: user.idUser, user: user.user },
        {
          secret: process.env.JWT_ACCESS_TOKEN,
          expiresIn: process.env.JWT_TIME,
        },
      );

      return { accessToken: newAccessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

  async changePassword(
    idUser: string,
    { email, password, newPassword }: UpdatePasswordDto,
  ) {
    const username = await this.userService.findByEmailWithPassword(email);

    if (!username) {
      throw new UnauthorizedException('Email is not valid');
    }

    const correctPassword = await bcrypt.compare(password, username.password);

    if (!correctPassword) {
      throw new UnauthorizedException('Password is not valid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    await this.userService.changePassword(idUser, {
      email,
      password: hashedPassword,
    });

    return this.userService.findByEmail(email);
  }

  async profile({ email }: { email: string }) {
    return await this.userService.findByEmail(email);
  }

  async generateJwt(
    payload: any,
  ): Promise<{ accessToken: string; refreshToken: string; email: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_TOKEN,
        expiresIn: process.env.JWT_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_TOKEN,
        expiresIn: process.env.JWT_REFRESH_TIME,
      }),
    ]);

    return { accessToken, refreshToken, email: payload.email };
  }
}
