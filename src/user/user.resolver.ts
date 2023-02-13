import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, GqlAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDTO } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
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
    @UseGuards(GqlAuthGuard)
    async users(@CurrentUser() user: User): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        console.log(user)
        return users;
    }

    @Query(() => User)
    async user(
        @Args('id') id: number
    ): Promise<User> {
        const user = await this.userService.findUserById(id);
        return user;
    }
}
