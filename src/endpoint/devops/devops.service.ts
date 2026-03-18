import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TenantDto } from "./dto";
import argon2 from "argon2";

@Injectable()
export class DevopsService {
    constructor(private readonly prisma: PrismaService) {}

    async tenantCreate(dto: TenantDto) {

        const passwordHash = await argon2.hash(dto.dbPassword);

        const tenant = await this.prisma.tenant.create({
            data: {
                tenantUid: dto.tenantUid,
                tenantName: dto.tenantName,
                dbName: dto.dbName,
                dbUsername: dto.dbUsername,
                dbPassword: passwordHash,
                createdBy: 'SYSTEM',
                updatedBy: 'SYSTEM'
            }
        });

        const { dbPassword, ...safeTenant } = tenant;

        return safeTenant;

    }
}