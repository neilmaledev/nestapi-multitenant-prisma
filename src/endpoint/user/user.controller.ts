import { Controller, Post, Get, Body, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { JwtGuard } from "src/core/auth/guard";
import { CurrentUser } from "src/core/auth/decorator";
import { PrismaTenantGuard } from "src/prisma/tenant/guard";
import { PrismaTenant } from "src/prisma/tenant/decorator";

@UseGuards(JwtGuard, PrismaTenantGuard)
@Controller('users')
export class UserController {
    constructor(private readonly prisma: PrismaService, private userService: UserService) {
    }

    @Get('me')
    async me(@CurrentUser() user: any, @PrismaTenant() prismaTenant: any) {
        const {password, ...safeUser} = await prismaTenant.user.findFirst();

        return {
            me: 'neil',
            user: user,
            safeUser: safeUser
        }
    }

    @Get()
    async get() {
        const user = await this.prisma.user.findFirst();

        return {
            msg: 'get user',
            user: user
        }
    }

    @Post()
    async create(@Body() dto: UserDto) {
        return await this.userService.create(dto);
    }
}