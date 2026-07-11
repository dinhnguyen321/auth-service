import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserCredential } from './entities/user-credential.entity';
import { UserProfiles } from './entities/user-profile.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserCredential, UserProfiles])],
})
export class UserModule {}
