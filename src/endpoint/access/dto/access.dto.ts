import { IsString, IsNotEmpty } from 'class-validator';

export class AccessDto {
    @IsString()
    @IsNotEmpty()
    tenantUid: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}