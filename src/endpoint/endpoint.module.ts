import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { DevopsModule } from './devops/devops.module';
import { PrismaTenantMiddleware } from '../prisma/tenant/prisma-tenant.middleware';

@Module({
    imports: [
        AccessModule,
        DevopsModule,
        UserModule
    ],
})
export class EndpointModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(PrismaTenantMiddleware)
      .forRoutes('*')   // apply to all routes

  }
}
