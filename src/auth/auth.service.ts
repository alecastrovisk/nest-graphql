import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UserPayload } from './models/UserPayload';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { ObjectType } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    login(user: User): Object {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        };

        const jwtToken = this.jwtService.sign(payload);

        return {
            user,
            access_token: jwtToken,
        }
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findUserByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                };
            }
        }
        throw new UnauthorizedException(
            'Email or password provided is incorrect!'
        );
    }
}
