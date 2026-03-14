import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DevopsModule } from './devops/devops.module';

@Module({
  imports: [
    AuthModule,
    DevopsModule,
    UserModule
],
})
export class EndpointModule {}
