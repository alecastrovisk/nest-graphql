import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
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
    ){}
    
    @UseGuards(LocalAuthGuard)
    @Post()
    async create(@Body() data: CreateUserDTO): Promise<User> {
        const user = await this.userService.createUser(data);
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number, 
        @Body() data: UpdateUserDTO
    ): Promise<string> {
        const user = await this.userService.updateUser(id, data);
        return 'Usuário atualizado!';
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<string> {
        await this.userService.deleteUser(id);
        return 'Usuário deletado com sucesso!';
    }

    @UseGuards(JwtAuthGuard)
    @Delete('soft/:id')
    async softDelete(
        @Param('id') id: number
    ): Promise<string> {
        await this.userService.softDeleteUser(id);
        return 'Usuário deletado com sucesso!';
    }
}