// database/prisma-tenant.manager.ts

import { Injectable } from '@nestjs/common'
import { PrismaTenantService } from './prisma-tenant.service';
import { PrismaTenantDto } from './dto';

@Injectable()
export class PrismaTenantManager {

    private tenants: Map<string, PrismaTenantService> = new Map();

    async getTenantClient(dto: PrismaTenantDto): Promise<PrismaTenantService> {
        let tenantClient = this.tenants.get(dto.dbName);

        if (!tenantClient) {
            tenantClient = new PrismaTenantService({
                dbHost: 'localhost',
                dbUsername: 'hiracorp',
                dbPassword: 'hiracorp777',
                dbName: 'db_tenant_hiracorp',
                dbPort: 3307
            });

            await tenantClient.$connect();
            this.tenants.set(dto.dbName, tenantClient);
        }

        return tenantClient;
    }
}