import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserDTO } from './dto/update-user.input';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(data: CreateUserDTO): Promise<User> {
        try {
            const emailExists = await this.findUserByEmail(data.email);
            if (emailExists) {
                throw new ConflictException('Email já existe!');
            }

            const userData = {
                ...data,
                password: await bcrypt.hash(data.password, 10),
            }

            const user = this.userRepository.create(userData);

            const userSaved = await this.userRepository.save(user);

            return {
                ...userSaved,
                password: undefined
            };
        } catch (error) {
            if (error instanceof ConflictException) throw error;

            throw new InternalServerErrorException(
                'Não foi possível salvar o usuário!'
            );
        }
    }

    async findAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new NotFoundException(
                'Não foi possível encontrar os usuários!'
            );
        }
    }

    async findUserById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({ id: id });

            return user;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { email: email }
            });

            return user;
        } catch (error) {
            throw new NotFoundException(
                'Usuário não encontrado pelo email!'
            );
        }
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({ id: id });

            if (!user) {
                throw new NotFoundException('Usuário não encontrado!');
            }

            await this.userRepository.update(id, data);

            const updatedUser = await this.userRepository.findOneBy({ id: id });

            return updatedUser;

        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException(
                'Não foi possível atualizar o usuário!'
            )
        }
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: id });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        await this.userRepository.delete(id);

    }

    async softDeleteUser(id: number): Promise<void> {
        try {
            const user = await this.userRepository.findOneBy({ id: id });

            if (!user) {
                throw new NotFoundException('Usuário não encontrado!');
            }

            await this.userRepository.softRemove(user);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;

            throw new InternalServerErrorException(
                'Não foi possível deletar o usuário'
            );
        }
    }
}
