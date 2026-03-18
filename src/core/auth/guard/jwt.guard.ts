import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const req = context.switchToHttp().getRequest();

    //     console.log("user >>>", req.user)

    //     return true;
    // }

    // handleRequest(err, user) {
    //     if (err || !user) {
    //         throw err || new Error('Unauthorized');
    //     }
    //     return user;
    // }
}