import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import argon2 from "argon2";
import { UserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: UserDto) {
        const passwordHash = await argon2.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                uid: 'test2',
                email: dto.email,
                username: dto.username,
                password: passwordHash,
                createdBy: 'SYSTEM',
                updatedBy: 'SYSTEM'
            }
        });

        return user;
    }
}