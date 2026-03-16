import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTenantMiddleware } from './tenant/prisma-tenant.middleware';

@Global()
@Module({
  providers: [PrismaService, PrismaTenantMiddleware],
  exports: [PrismaService, PrismaTenantMiddleware],
})
export class PrismaModule {}