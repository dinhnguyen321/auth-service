import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AssignRolesDto } from './dto/assign-role.dto';
import { AssignPermissionsDto } from './dto/assign-permission.dto';

import { User } from '../user/entities/user.entity';

import { AuthorizationService } from './authorization.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from './roles/roles.decorators';

@ApiTags('Authorization')
@Controller('users')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Put(':id/roles')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  assignRoles(
    @Param('id') userId: string,
    @Body() dto: AssignRolesDto,
    @CurrentUser() currentUserId: User,
  ) {
    return this.authorizationService.assignRoles(userId, dto, currentUserId.id);
  }

  @Put('roles/permissions')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  assignPermissions(
    @Body() dto: AssignPermissionsDto,
    @CurrentUser() currentUserId: User,
  ) {
    return this.authorizationService.assignPermissions(dto, currentUserId.id);
  }

  @Get('/roles/all')
  findAllRoles() {
    return this.authorizationService.findAllRoles();
  }

  @Get('/role/:id')
  findRoleById(@Param('id') id: number) {
    return this.authorizationService.findRoleById(id);
  }

  @Post('/role')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  createRole(@Body() dto: CreateRoleDto) {
    return this.authorizationService.createRole(dto);
  }

  @Put('/role/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateRole(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
    return this.authorizationService.updateRole(id, dto);
  }
}
