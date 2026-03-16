import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        @Inject(REQUEST) private req: Request,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signToken(username: string): Promise<{access_token: string}> {
        const payload = {
            username: username,
            sampleFromReq: this.req['sampleFromReq']
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token
        };
    }
    
}