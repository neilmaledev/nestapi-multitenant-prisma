import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TenantDto {
    @IsString()
    @IsNotEmpty()
    tenantUid: string;

    @IsNotEmpty()
    @IsString()
    tenantName: string;

    @IsNotEmpty()
    @IsString()
    dbUsername: string;

    @IsNotEmpty()
    @IsString()
    dbPassword: string;
}