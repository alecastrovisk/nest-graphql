import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserDTO } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(data: CreateUserDTO): Promise<User> {
        const user = this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);

        if(!userSaved) {
            throw new InternalServerErrorException(
                'Não foi possível salvar o usuário!'
            );
        }

        return userSaved;
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }
    
    async findUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: parseInt(id) });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        return user;
    }

    async updateUser(id: string, data: UpdateUserDTO): Promise<void> {  
        const user = await this.userRepository.findOneBy({ id: parseInt(id) });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        await this.userRepository.update(id, data);
        
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: parseInt(id) });
        if(!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        await this.userRepository.delete(id);
    }
}
