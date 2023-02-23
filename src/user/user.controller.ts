import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserDTO } from './dto/update-user.input';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    async create(@Body() data: CreateUserDTO): Promise<User> {
        const user = await this.userService.createUser(data);
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateUserDTO
    ): Promise<Object> {
        const user = await this.userService.updateUser(id, data);
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Object> {
        await this.userService.deleteUser(id);
        return {
            message: 'Usuário deletado!'
        };
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('soft/:id')
    async softDelete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Object> {
        await this.userService.softDeleteUser(id);
        return {
            message: 'Usuário deletado!'
        };
    }
}