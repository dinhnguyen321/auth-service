import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Permissions } from '../decorators/permissions.decorators';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Get('/all')
  getAllPermission() {
    return this.permissionService.getAllPermission();
  }

  @Get(':id')
  getPermissionById(@Param('id') id: number) {
    return this.permissionService.getPermissionById(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Permissions('user:create')
  createPermission(@Body() permission: CreatePermissionDto) {
    return this.permissionService.createPermission(permission);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Permissions('user:update')
  updatePermission(@Param('id') id: number, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(id, dto);
  }
}
