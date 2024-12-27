import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async create({user, name, lastName, password, email, avatar, googleId}: CreateUserDto) {
    let hashedPassword = null;
    
    const salt = parseInt(process.env.SALT);
    if (password) {
      const isHashed = password?.startsWith('$2b$');
      hashedPassword = isHashed ? password : await bcrypt.hash(password, salt);
    }

    try {
      const processedAvatar = avatar || '/uploads/default/avatar.webp';

      const userCreate = this.userRepository.create({
        user,
        name,
        lastName,
        password: hashedPassword,
        email,
        avatar: processedAvatar,
        googleId
      });

      return await this.userRepository.save(userCreate);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating a new user: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while creating the user.');
    }
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: {email},
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
    return await this.userRepository.findOneBy({email});
  }

  async changePassword(
    idUser: string,
    {email, password}: { email: string; password: string },
  ) {
    const user = await this.userRepository.findOne({
      where: {idUser, email},
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

    return {message: 'Password change correctly'};
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(idUser: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {idUser}, select: [
          'idUser', 'user', 'email', 'rol', 'avatar', 'lastName', 'name',
        ]
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${idUser} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`User with ID ${idUser} not found`);
      }
    }
  }

  async update(idUser: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update(idUser, updateUserDto)

      if (user.affected === 0) {
        new BadRequestException(`User with ID ${idUser} not found`);
      }

      return this.userRepository.findOne({where: {idUser}});
    } catch {
      new BadRequestException(`User with ID ${idUser} not found`);
    }
  }

  async remove(idUser: string) {
    const user = await this.userRepository.delete(idUser);

    if (user.affected === 0) {
      throw new BadRequestException(`User with ID ${idUser} not found`);
    }

    return { message: `User with ID ${idUser} deleted correctly` };
  }
}
