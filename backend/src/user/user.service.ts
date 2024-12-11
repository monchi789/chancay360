import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from '../shared/enums/rol.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ user, name, lastName, password, rol, email }: CreateUserDto) {
    const salt = parseInt(process.env.SALT);
    const isHashed = password.startsWith('$2b$');
    const hashedPassword = isHashed
      ? password
      : await bcrypt.hash(password, salt);

    try {
      if (!Object.values(Rol).includes(rol as Rol)) {
        new Error(`The rol "${rol}" is not valid.`);
      }

      const userCreate = this.userRepository.create({
        user,
        name,
        lastName,
        password: hashedPassword,
        rol,
        email,
      });
      return this.userRepository.save(userCreate);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error to create a new User.');
      }
    }
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: [
        'idUser',
        'user',
        'email',
        'password',
        'rol',
        'name',
        'lastName',
      ],
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async changePassword(
    idUser: string,
    { email, password }: { email: string; password: string },
  ) {
    const user = await this.userRepository.findOne({
      where: { idUser, email },
      select: ['idUser', 'email', 'password'],
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${idUser} and email ${email} not found`,
      );
    }

    const result = await this.userRepository.update(idUser, {
      password,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Not possible change the password of user with ID ${idUser}`,
      );
    }

    return { message: 'Password change correctly' };
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
