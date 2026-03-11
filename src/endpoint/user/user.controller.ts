import { Controller, Post, Get, Body } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { UserDto } from "./dto";

@Controller('users')
export class UserController {
    constructor(private readonly prisma: PrismaService, private userService: UserService) {
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