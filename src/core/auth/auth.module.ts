import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
    imports: [JwtModule.register({})],
    exports: [JwtModule, AuthService],
    providers: [AuthService]
})
export class AuthModule {}