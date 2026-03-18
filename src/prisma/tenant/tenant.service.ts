import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaTenantDto } from "./dto";
import { EncryptionService } from "src/shared/service/encryption.service";
import { PrismaTenantService } from "./prisma-tenant.service";
import { PrismaTenantManager } from "./prisma-tenant.manager";

@Injectable()
export class TenantService {
    constructor(
        private prisma: PrismaService,
        private encryptionService: EncryptionService,
        private prismaTenantManager: PrismaTenantManager
    ) {}

    async getTenant(tenantUid: string) {
        return await this.prisma.tenant.findFirst({
            where: {
                tenantUid: tenantUid
            }
        })
    }

    async getTenantDbConnection(dto: PrismaTenantDto) {
        const dbPassword = this.encryptionService.decrypt(dto.dbPassword);

        return await this.prismaTenantManager.getTenantClient({
            dbHost: dto.dbHost,
            dbUsername: dto.dbUsername,
            dbPassword: dbPassword,
            dbName: dto.dbName,
            dbPort: Number(dto.dbPort)
        });
    }
}