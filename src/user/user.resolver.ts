import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ){}

    @Mutation(() => User)
    async createUser(
        @Args('data') data: CreateUserDTO
    ): Promise<User> {
        const user = await this.userService.createUser(data);
        return user;
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        return users;
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        const user = await this.userService.findUserById(id);
        return user;
    }

}
