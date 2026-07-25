/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from 'src/modules/authorization/entities/permission.entity';
import { RolePermission } from 'src/modules/authorization/entities/role-permission';
import { Role } from 'src/modules/authorization/entities/role.entity';

import { ROLE_SEED } from './seeds/role.seed';
import { ROLE_PERMISSION_MAP } from './seeds/role-permission.seed';
import { PERMISSION_SEED } from './seeds/permission.seed';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async seed() {
    this.logger.log('Start Seeding...');
    await this.seedRoles();
    await this.seedPermissions();
    await this.seedRolePermissions();
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
    for (const permission of PERMISSION_SEED) {
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
}
