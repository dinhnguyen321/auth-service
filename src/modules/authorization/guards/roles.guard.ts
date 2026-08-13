import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { Repository } from 'typeorm';

import { ROLES_KEY } from '../decorators/roles.decorators';

import { UserRole } from '../entities/user-role.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // Giúp Guard đọc metadata
    @InjectRepository(UserRole)
    private readonly roleRepository: Repository<UserRole>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('ROLES_KEY', ROLES_KEY);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    const activeUserRole = user.userRoles.filter(
      (uRole) => uRole.isActive === true,
    );

    const nameUserRole = activeUserRole.map((uRole) => uRole.role.name);

    const hasRole = requiredRoles.some((requiredRole) =>
      nameUserRole.includes(requiredRole),
    );

    if (!hasRole) {
      throw new ForbiddenException('User does not have the required role');
    }
    return hasRole;
  }
}
