import { Module } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.services';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      Permission,
      RolePermission,
      UserRole,
      User,
    ]),
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, UserService],
})
export class AuthorizationModule {}
