import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findRoleById(id: number): Promise<Role | null> {
    return await this.roleRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: {
        name: dto.name,
      },
    });
    if (role) {
      throw new NotFoundException('Role already exists');
    }
    const createRole = this.roleRepository.create({
      name: dto.name,
      description: dto.description,
    });
    return await this.roleRepository.save(createRole);
  }

  async updateRole(id: number, dto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not already exists');
    }

    Object.assign(role, dto);
    return await this.roleRepository.save(role);
  }
}
