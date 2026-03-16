import { Module } from "@nestjs/common";
import { AccessController } from "./access.controller";

@Module({
    controllers: [AccessController],
    providers: []
})
export class AccessModule {}