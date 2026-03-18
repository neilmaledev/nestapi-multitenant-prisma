import { Controller, Post, Get, Body } from "@nestjs/common";
import { DevopsService } from "./devops.service";
import { TenantDto } from "./dto";
import { EncryptionService } from "src/shared/service/encryption.service";

@Controller('devops')
export class DevopsController {
    constructor(private devopsService: DevopsService, private encryptionService: EncryptionService) {}

    @Post('tenants')
    async tenantCreate(@Body() dto: TenantDto) {
        return this.devopsService.tenantCreate(dto);
    }

    @Post('encrypt')
    async encrypt(@Body() dto: {text: string}) {
        return this.encryptionService.encrypt(dto.text);
    }

    @Post('decrypt')
    async decrypt(@Body() dto: {text: string}) {
        return this.encryptionService.decrypt(dto.text);
    }

}