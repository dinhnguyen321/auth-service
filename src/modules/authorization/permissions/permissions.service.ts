import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(permission: CreatePermissionDto) {
    const code = permission.module + permission.action;

    const getCodePermission = await this.permissionRepository.findOne({
      where: {
        code: code,
      },
    });

    if (getCodePermission) {
      throw new NotFoundException('Permission already exists');
    }

    const createPermission = this.permissionRepository.create({
      action: permission.action,
      module: permission.module,
      description: permission.description,
      code: code,
    });

    return await this.permissionRepository.save(createPermission);
  }

  async getAllPermission(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async getPermissionById(id: number): Promise<Permission | null> {
    return await this.permissionRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updatePermission(id: number, dto: UpdatePermissionDto) {
    const permission = await this.permissionRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!permission) {
      throw new NotFoundException('Permission not already exists');
    }

    Object.assign(permission, dto);
    return await this.permissionRepository.save(permission);
  }
}
