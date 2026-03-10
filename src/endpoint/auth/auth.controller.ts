import { Controller, Post, Get } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly prisma: PrismaService) {
    }

    @Get('signin')
    async get() {
        // todo todo todo
        // precreate user in database
        const user = await this.prisma.user.findFirst();

        return {
            msg: 'get user',
            user: user
        }
    }
}