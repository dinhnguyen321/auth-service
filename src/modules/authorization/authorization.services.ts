import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from '../user/user.service';

import { AssignRolesDto } from './dto/assign-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { DataSource, In, Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { AssignPermissionsDto } from './dto/assign-permission.dto';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly userService: UserService,
  ) {}

  async assignRoles(
    userId: string,
    dto: AssignRolesDto,
    CurrentUserId: string,
  ) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { name } = dto;

    if (!name || name.length === 0) {
      throw new BadRequestException('Role IDs list cannot be empty');
    }
    const validRoleNames = await this.roleRepository.find({
      where: {
        name: In(dto.name),
      },
    });
    if (validRoleNames.length !== name.length) {
      const roleNames = validRoleNames.map((role) => role.id);
      const invalidRoleNames = name.filter(
        (id) => !roleNames.includes(Number(id)),
      );
      throw new BadRequestException(
        `These Roles do not exist ${invalidRoleNames.join(', ')}`,
      );
    }
    await this.dataSource.transaction(async (manager) => {
      await manager.delete(UserRole, { userId });

      const userRoles = validRoleNames.map((role) => {
        return manager.create(UserRole, {
          user,
          role,
          assignedBy: CurrentUserId,
          isActive: true,
        });
      });
      await manager.save(userRoles);
    });

    return {
      success: true,
      message: 'Gán quyền thành công',
      data: {
        userId,
        roles: validRoleNames.map((role) => ({
          id: role.id,
          name: role.name,
        })),
      },
    };
  }

  async assignPermissions(dto: AssignPermissionsDto, currentUserId: string) {
    const { roleId, permissionIds } = dto;

    const role = await this.roleRepository.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissions = await this.permissionRepository.find({
      where: {
        id: In(permissionIds),
      },
    });

    if (permissions.length === 0) {
      throw new NotFoundException('Permissions not found');
    }

    if (permissions.length !== permissionIds.length) {
      const existingPermissionIds = permissions.map(
        (permission) => permission.id,
      );
      const invalidPermissionIds = permissionIds.filter(
        (id) => !existingPermissionIds.includes(id),
      );
      throw new BadRequestException(
        `These Permissions do not exist ${invalidPermissionIds.join(', ')}`,
      );
    }

    await this.dataSource.transaction(async (manager) => {
      // v1
      await manager
        .createQueryBuilder()
        .delete()
        .from(RolePermission)
        .where('role_id = :roleId', { roleId })
        .execute();
      // v2
      // await manager.delete(RolePermission, { roleId });

      const rolePermissions = permissions.map((permission) => {
        return manager.create(RolePermission, {
          role,
          permission,
          assignedBy: currentUserId,
        });
      });
      await manager.save(rolePermissions);
    });
    return {
      success: true,
      message: 'Gán quyền chi tiết thành công',
      data: {
        userAdmin: currentUserId,
        nameRole: role.name,
        permissions: permissions.map((p) => ({
          id: p.id,
          code: p.code,
        })),
      },
    };
  }
}
