import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { RegisterUserDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

import { AuthService } from './auth.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  @UseGuards(JwtAuthGuard)
  loginUser(@Body() dto: loginDto) {
    return this.authService.loginUser(dto);
  }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: User) {
    console.log('user_controller_auth: ', user);
    return user;
  }
}
