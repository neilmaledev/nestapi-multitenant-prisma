import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TenantService } from "../tenant.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PrismaTenantGuard implements CanActivate {
    constructor(
        private config: ConfigService,
        private tenantService: TenantService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if (!req.user) {
            throw new Error('User not found');
        }

        const tenant = await this.tenantService.getTenant(req.user.tenant.tenantUid);

        if (!tenant) {
            throw new Error('Tenant not found');
        }

        const dbHost = this.config.get('DATABASE_HOST');
        const dbPort = this.config.get('DATABASE_PORT');

        req.prismaTenant = await this.tenantService.getTenantDbConnection({
            dbHost: dbHost,
            dbUsername: tenant.dbUsername,
            dbPassword: tenant.dbPassword,
            dbName: tenant.dbName,
            dbPort: Number(dbPort)
        });

        return true;
    }
}