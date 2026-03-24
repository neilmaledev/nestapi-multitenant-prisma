import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        // @Inject(REQUEST) private req: Request, // commented for reference
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signToken(tenantUid: string, username: string): Promise<string> {
        const payload = {
            username: username,
            tenant: {
                tenantUid: tenantUid
            }
        };

        const tokenSecret = this.config.get('TOKEN_SECRET');
        const tokenExpiry = this.config.get('TOKEN_EXPIRY');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: tokenExpiry,
            secret: tokenSecret
        });

        return token;
    }
    
}