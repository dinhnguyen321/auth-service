import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCredential } from '../user/entities/user-credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
