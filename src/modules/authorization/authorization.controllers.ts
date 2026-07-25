import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { AssignRolesDto } from './dto/assign-role.dto';
import { AuthorizationService } from './authorization.services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { AssignPermissionsDto } from './dto/assign-permission.dto';

@ApiTags('Authorization')
@Controller('users')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Put(':id/roles')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  assignRoles(
    @Param('id') userId: string,
    @Body() dto: AssignRolesDto,
    @CurrentUser() currentUserId: User,
  ) {
    return this.authorizationService.assignRoles(userId, dto, currentUserId.id);
  }

  @Put('roles/permissions')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  assignPermissions(
    @Body() dto: AssignPermissionsDto,
    @CurrentUser() currentUserId: User,
  ) {
    return this.authorizationService.assignPermissions(dto, currentUserId.id);
  }
}
