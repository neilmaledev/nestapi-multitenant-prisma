import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TenantService } from './tenant/tenant.service';
import { PrismaTenantManager } from './tenant/prisma-tenant.manager';

@Global()
@Module({
  providers: [PrismaService, TenantService, PrismaTenantManager],
  exports: [PrismaService, TenantService, PrismaTenantManager],
})
export class PrismaModule {}