import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signin() {
        return {
            msg: 'im a signin !!!!'
        }
    }

    signup() {
        return 'im a signup'
    }
}