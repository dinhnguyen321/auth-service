import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
// import { Permission } from '../entities/permission.entity';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorators';
import { In, Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { RolePermission } from '../entities/role-permission';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    // @InjectRepository(Permission)
    // private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    // Lấy những role đang active
    const activeUserRole = user.userRoles.filter(
      (uRole) => uRole.isActive === true,
    );

    // Lấy role_id từ những role đang active
    const roleIds = activeUserRole.map((uRole) => uRole.roleId);

    // User không có role active
    if (roleIds.length === 0) {
      return false;
    }

    // Lấy permission của các role
    const rolePermissions = await this.rolePermissionRepository.find({
      where: {
        role_id: In(roleIds),
      },
      relations: {
        permission: true,
      },
    });

    // Lấy permission code
    const userPermission = rolePermissions.map(
      (rolePermission) => rolePermission.permission.code,
    );

    const hasPermission = requiredPermissions.some((requiredPermission) =>
      userPermission.includes(requiredPermission),
    );

    if (!hasPermission) {
      throw new ForbiddenException({
        code: 'INSUFFICIENT_PERMISSION',
        message: 'User does not have the required permission',
      });
    }
    return true;
  }
}
