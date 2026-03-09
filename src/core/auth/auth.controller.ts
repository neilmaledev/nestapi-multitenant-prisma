import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
    }

    @Post('signin')
    signin() {
        return this.AuthService.signin()
    }

    @Post('signup')
    signup() {
        return this.AuthService.signup()
    }
}