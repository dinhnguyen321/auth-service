import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { UserCredential } from '../user/entities/user-credential.entity';

import { RegisterUserDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserCredential)
    private readonly credentialRepository: Repository<UserCredential>,
  ) {}

  async registerUser(dto: RegisterUserDto) {
    const { email, password, fullName, phone, avatarUrl } = dto;

    const existingUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, this.saltRounds);

    return await this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, {
        email,
        fullName,
        phone,
        avatarUrl,
      });
      const saveUser = await manager.save(user);

      const credential = manager.create(UserCredential, {
        user_id: saveUser.id,
        passwordHash: passwordHash,
        failedLoginAttempts: 0,
      });

      await manager.save(credential);

      return {
        message: 'Register successfully',
      };
    });
  }
}
