// database/prisma-tenant.manager.ts

import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaTenantService } from './prisma-tenant.service';

@Injectable()
export class PrismaTenantManager {

    private tenants: Map<string, PrismaTenantService> = new Map();

    async getTenantClient(tenantUid: string): Promise<PrismaTenantService> {
        let tenantClient = this.tenants.get(tenantUid);

        if (!tenantClient) {
            tenantClient = new PrismaTenantService({
                databaseHost: 'localhost',
                databaseUser: 'hiracorp',
                databasePassword: 'hiracorp777',
                databaseName: 'db_tenant_hiracorp',
                databasePort: 3307
            });

            await tenantClient.$connect();
            this.tenants.set(tenantUid, tenantClient);
        }

        return tenantClient;
    }
}