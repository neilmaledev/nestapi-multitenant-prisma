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
                dbHost: dto.dbHost,
                dbUsername: dto.dbUsername,
                dbPassword: dto.dbPassword,
                dbName: dto.dbName,
                dbPort: Number(dto.dbPort)
            });

            await tenantClient.$connect();
            this.tenants.set(dto.dbName, tenantClient);
        }

        return tenantClient;
    }
}