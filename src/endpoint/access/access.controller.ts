import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import argon2 from "argon2";
import { AccessDto } from "./dto";
import { AuthService } from "src/core/auth/auth.service";

@Controller('access')
export class AccessController {
    constructor(
        private readonly prisma: PrismaService,
        private authService: AuthService
    ) {}

    @Post('signin')
    async signin(@Body() dto: AccessDto) {
        // const user = await this.prisma.user.findFirst();

        // TODO: validate dto username and pass

        const token = await this.authService.signToken(dto.tenantUid, dto.username);

        return {
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