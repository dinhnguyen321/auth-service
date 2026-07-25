import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import databaseConf/ig from 'src/config/database.config';

import { Permission } from 'src/modules/authorization/entities/permission.entity';
import { RolePermission } from 'src/modules/authorization/entities/role-permission';
import { Role } from 'src/modules/authorization/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole } from 'src/modules/authorization/entities/user-role.entity';

import { SeedService } from './seed.service';
import { DatabaseModule } from './database.module';
import { UserCredential } from 'src/modules/user/entities/user-credential.entity';
import { UserProfiles } from 'src/modules/user/entities/user-profile.entity';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      User,
      UserCredential,
      UserProfiles,
      UserRole,
      Role,
      Permission,
      RolePermission,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
