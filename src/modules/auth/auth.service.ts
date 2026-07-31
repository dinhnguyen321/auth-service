import { loginDto } from './dto/login.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { User, UserStatus } from '../user/entities/user.entity';
import { UserCredential } from '../user/entities/user-credential.entity';

import { RegisterUserDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_TIME = 30;

  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserCredential)
    private readonly credentialRepository: Repository<UserCredential>,

    private readonly jwtService: JwtService,
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

    if (!password) {
      throw new BadRequestException('Password is required');
    }
    const passwordHash = await bcrypt.hash(password, this.saltRounds);

    return await this.dataSource.transaction(async (manager) => {
      const user = manager.create(User, {
        email,
        fullName,
        phone,
        avatarUrl,
        status: UserStatus.ACTIVE,
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

  async loginUser(dto: loginDto) {
    const { email, password } = dto;
    const user = await this.findUserByEmail(email);

    const credential = await this.findCredential(user.id);

    this.checkAccountLocked(credential);

    const isMatch = await bcrypt.compare(password, credential.passwordHash);
    // KIểm tra nếu mật khẩu không đúng thì cộng số lần thất bại đến giới hạn sẽ tạm khóa
    if (!isMatch) {
      await this.handleLoginFailed(credential, user.id);

      throw new UnauthorizedException('Email or password is incorrect');
    }

    await this.handleLoginSuccess(user.id);

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successfully',
      accessToken,
    };
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    return user;
  }

  private async findCredential(idUser: string): Promise<UserCredential> {
    const credential = await this.credentialRepository.findOne({
      where: {
        user_id: idUser,
      },
    });

    if (!credential) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    return credential;
  }

  private checkAccountLocked(credential: UserCredential): void {
    // Kiểm tra xem tài khoản có đang bị khóa không
    if (credential?.lockedUntil && credential?.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account is locked');
    }
  }

  private async handleLoginFailed(
    credential: UserCredential,
    userId: string,
  ): Promise<void> {
    const nextFailedAttempts = credential.failedLoginAttempts + 1;

    await this.credentialRepository.increment(
      {
        user_id: userId,
      },
      'failedLoginAttempts',
      1,
    );
    if (nextFailedAttempts >= this.MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = new Date();
      lockedUntil.setMinutes(lockedUntil.getMinutes() + this.LOCK_TIME);

      await this.credentialRepository.update(
        {
          user_id: userId,
        },
        {
          lockedUntil,
        },
      );
    }
  }

  private async handleLoginSuccess(userId: string): Promise<void> {
    // Neu password dung
    const updateData = {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    };

    await this.credentialRepository.update(
      {
        user_id: userId,
      },
      updateData,
    );
  }
}
