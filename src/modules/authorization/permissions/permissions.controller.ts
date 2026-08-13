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
import { Roles } from '../decorators/roles.decorators';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createPermission(@Body() permission: CreatePermissionDto) {
    return this.permissionService.createPermission(permission);
  }

  @Put(':i d')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updatePermission(@Param('id') id: number, @Body() dto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(id, dto);
  }
}
