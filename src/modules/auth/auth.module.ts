import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
import { UserCredential } from '../user/entities/user-credential.entity';
import { Role } from '../authorization/entities/role.entity';
import { UserRole } from '../authorization/entities/user-role.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// JWT
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, UserCredential, Role, UserRole]),
    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, UserService],
})
export class AuthModule {}
