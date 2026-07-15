import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserCredential } from './entities/user-credential.entity';
import { UserProfiles } from './entities/user-profile.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential, UserProfiles])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
