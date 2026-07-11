import { Module } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, RolePermission, UserRole]),
  ],
})
export class AuthorizationModule {}
