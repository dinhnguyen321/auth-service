import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
// import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { AuthModule } from './modules/auth/auth.module';
// import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthorizationModule,
    AuthModule,
    // AuthModule,
    // RefreshTokenModule,
  ],
})
export class AppModule {}
