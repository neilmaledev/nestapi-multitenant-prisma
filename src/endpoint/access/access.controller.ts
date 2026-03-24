import { Controller, Post, Get, Body, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import argon2 from "argon2";
import { AccessDto } from "./dto";
import { AuthService } from "src/core/auth/auth.service";
import { TenantService } from "src/prisma/tenant/tenant.service";
import { ConfigService } from "@nestjs/config";

@Controller('access')
export class AccessController {
    constructor(
        private readonly prisma: PrismaService,
        private authService: AuthService,
        private tenantService: TenantService,
        private config: ConfigService
    ) {}

    @Post('signin')
    async signin(@Body() dto: AccessDto) {
        // Convert this into service
        // Step 1 - Get tenant
        const tenant = await this.tenantService.getTenant(dto.tenantUid);

        if (!tenant) {
            console.error("AccessController.signin >> Tenant not found");
            throw new NotFoundException('Credentials did not match');
        }

        // Step 2 - Get a tenant db connection
        const dbHost = this.config.get('DATABASE_HOST');
        const dbPort = this.config.get('DATABASE_PORT');

        const prismaTenant = await this.tenantService.getTenantDbConnection({
            dbHost: dbHost,
            dbUsername: tenant.dbUsername,
            dbPassword: tenant.dbPassword,
            dbName: tenant.dbName,
            dbPort: Number(dbPort)
        });

        // Step 3 - Get the user from the tenant db connection
        const user = await prismaTenant.user.findFirst({
            where: {
                username: dto.username
            }
        });

        if (!user) {
            console.error("AccessController.signin >> User not found");
            throw new Error('Credentials did not match');
        }

        // Step 4 - Verify the user password
        const isPasswordVerified = await argon2.verify(user.password, dto.password);

        if (!isPasswordVerified) {
            console.error("AccessController.signin >> Password is incorrect");
            throw new Error('Credentials did not match');
        }

        // Step 5 - Generate a token
        const token = await this.authService.signToken(dto.tenantUid, dto.username);

        return {
            status: "ok",
            access_token: token
        };
    }

    @Get('password-hash')
    async passwordHash() {
        const password = "superagent777";
        return {
            password: password,
            passwordHash: await argon2.hash(password)
        };
    }

    @Get('password-verify')
    async passwordVerify() {
        const passwordHash = "$argon2id$v=19$m=65536,t=3,p=4$TbVFDMRHeuh0HyNdP5nnuA$GmaHwdN/2LCAw2Vd1S/FpcGGHhVIRlW5/OGExWbT/eE";
        const password = "superagent777";

        return {
            password: password,
            passwordHash: await argon2.verify(passwordHash, password)
        };
    }
}