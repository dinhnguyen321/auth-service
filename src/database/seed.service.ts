/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Permission } from 'src/modules/authorization/entities/permission.entity';
import { RolePermission } from 'src/modules/authorization/entities/role-permission';
import { Role } from 'src/modules/authorization/entities/role.entity';

import { ROLE_SEED } from './seeds/role.seed';
import { ROLE_PERMISSION_MAP } from './seeds/role-permission.seed';
import { PERMISSIONS_SEED } from './seeds/permissions.seed';
import { USERS_SEED } from './seeds/users.seed';
import { User } from '../modules/user/entities/user.entity';
import { UserCredential } from '../modules/user/entities/user-credential.entity';

import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/modules/authorization/entities/user-role.entity';
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,

    @InjectRepository(UserCredential)
    private readonly credentialRepository: Repository<UserCredential>,
  ) {}

  async seed() {
    this.logger.log('Start Seeding...');
    await this.seedRoles();
    await this.seedPermissions();
    await this.seedRolePermissions();
    await this.seedRolePermissions();
    await this.seedUsers();
  }

  private async seedRoles(): Promise<void> {
    for (const role of ROLE_SEED) {
      const exists = await this.roleRepository.findOne({
        where: {
          name: role.name,
        },
      });

      if (exists) {
        this.logger.log(`Role ${role.name} already exists`);
        continue;
      }

      await this.roleRepository.save(role);

      this.logger.log(`Role ${role.name} created`);
    }
  }
  private async seedPermissions(): Promise<void> {
    for (const permission of PERMISSIONS_SEED) {
      const code = `${permission.module}:${permission.action}`;
      const exists = await this.permissionRepository.findOne({
        where: {
          code: code,
        },
      });

      if (exists) {
        this.logger.log(`Permission ${code} already exists`);
        continue;
      }

      await this.permissionRepository.save({
        ...permission,
        code,
      });

      this.logger.log(`Permission ${code} created`);
    }
  }
  private async seedRolePermissions() {
    const roles = await this.roleRepository.find();

    const permissions = await this.permissionRepository.find();

    const roleMap = new Map(roles.map((role) => [role.name, role]));

    const permissionMap = new Map(
      permissions.map((permission) => [permission.code, permission]),
    );

    for (const roleName of Object.keys(ROLE_PERMISSION_MAP) as Array<
      keyof typeof ROLE_PERMISSION_MAP
    >) {
      const role = roleMap.get(roleName);
      if (!role) continue;
      const permissionCodes = ROLE_PERMISSION_MAP[roleName];

      for (const code of permissionCodes) {
        const permission = permissionMap.get(code);
        if (!permission) continue;

        const exists = await this.rolePermissionRepository.findOne({
          where: {
            role: {
              id: role.id,
            },
            permission: {
              id: permission.id,
            },
          },
        });

        if (exists) {
          this.logger.log(
            `Role${role.name} already has permission ${code} already exists`,
          );
          continue;
        }

        const rolePermission = this.rolePermissionRepository.create({
          role,
          permission,
          assignedBy: 'SYSTEM',
        });

        await this.rolePermissionRepository.save(rolePermission);

        this.logger.log(`Assigned ${permission.code} to ${role.name}`); // note lại các flow trên gpt
      }
    }
  }

  private async seedUsers() {
    const getUsers = await this.userRepository.find();
    const roles = await this.roleRepository.find();

    const userMap = new Set(getUsers.map((u) => u.email));
    const roleMap = new Map(roles.map((u) => [u.name, u]));
    for (const user of USERS_SEED) {
      if (userMap.has(user.email)) {
        this.logger.log(`Email:${user.email} already exists`);
        continue;
      }

      const passwordHash = await bcrypt.hash(user.password, 10);

      const role = roleMap.get(user.role);
      if (!role) {
        throw new Error(`Role ${user.role} not found`);
      }

      await this.dataSource.transaction(async (manager) => {
        const users = manager.create(User, {
          email: user.email,
          fullName: user.fullName,
        });
        const saveUsers = await manager.save(users);

        const userRole = manager.create(UserRole, {
          user: saveUsers,
          role,
          assignedBy: user.assignedBy,
        });
        await manager.save(userRole);

        const credentials = manager.create(UserCredential, {
          user_id: saveUsers.id,
          passwordHash: passwordHash,
          failedLoginAttempts: 0,
        });
        await manager.save(credentials);
      });
      userMap.add(user.email);
    }
    return {
      message: 'Register seed data successfully',
    };
  }
}
