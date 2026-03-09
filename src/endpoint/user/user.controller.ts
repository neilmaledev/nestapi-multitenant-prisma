import { Controller, Post, Get } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Controller('user')
export class UserController {
    constructor(private readonly prisma: PrismaService) {
    }

    @Get()
    async get() {

        const user = await this.prisma.user.findFirst();

        return {
            msg: 'get user',
            user: user
        }
    }
}