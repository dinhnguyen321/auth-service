import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AssignRolesDto } from './dto/assign-role.dto';
import { AssignPermissionsDto } from './dto/assign-permission.dto';

import { User } from '../user/entities/user.entity';

import { AuthorizationService } from './authorization.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorators';

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
}
