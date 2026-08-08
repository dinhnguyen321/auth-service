import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { User } from '../../user/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET must be defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('payload in Strategy: ', payload);
    // const user = await this.userService.findOne(payload.sub);
    const userRole = await this.userService.findOneWithRoles(payload.sub);
    // console.log('user in Strategy: ', user);
    console.log(
      'User roles from auth:',
      userRole,
      userRole?.userRoles?.map((userRole) => ({
        roleId: userRole.roleId,
        roleName: userRole.role?.name,
        isActive: userRole.isActive,
      })),
    );
    if (!userRole) {
      throw new UnauthorizedException();
    }
    return userRole;
  }
}
