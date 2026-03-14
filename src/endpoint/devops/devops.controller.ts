import { Controller, Post, Get, Body } from "@nestjs/common";
import { DevopsService } from "./devops.service";
import { TenantDto } from "./dto";

@Controller('devops')
export class DevopsController {
    constructor(private devopsService: DevopsService) {}

    @Post('tenants')
    async tenantCreate(@Body() dto: TenantDto) {
        return this.devopsService.tenantCreate(dto);
    }

}