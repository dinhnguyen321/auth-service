import { Module } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsService } from './permissions/permissions.service';
import { PermissionsController } from './permissions/permissions.controller';

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
  controllers: [
    AuthorizationController,
    RolesController,
    PermissionsController,
  ],
  providers: [
    AuthorizationService,
    UserService,
    RolesService,
    PermissionsService,
  ],
})
export class AuthorizationModule {}
