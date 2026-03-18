import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { DevopsModule } from './devops/devops.module';

@Module({
    imports: [
        AccessModule,
        DevopsModule,
        UserModule
    ],
})
export class EndpointModule {}
