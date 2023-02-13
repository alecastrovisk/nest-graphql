import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserDTO } from './dto/update-user.input';
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
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: UpdateUserDTO
    ): Promise<Object> {
        const user = await this.userService.updateUser(id, data);
        return {
            message: 'Usuário atualizado!'
        };
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(
        @Param('id') id: number
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
        @Param('id') id: number
    ): Promise<Object> {
        await this.userService.softDeleteUser(id);
        return {
            message: 'Usuário deletado!'
        };
    }
}