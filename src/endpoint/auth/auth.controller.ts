import { Controller, Post, Get, Body } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import argon2 from "argon2";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly prisma: PrismaService) {
    }

    @Post('signin')
    async signin(@Body() dto: AuthDto) {
        // const user = await this.prisma.user.findFirst();

        // TODO: validate dto username and pass

        return {
            msg: 'get user',
            // user: user,
            dto: dto
        }
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