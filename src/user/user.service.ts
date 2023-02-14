import { 
    Injectable, 
    InternalServerErrorException, 
    NotAcceptableException, 
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
    ){}

    async createUser(data: CreateUserDTO): Promise<User> {
        // const emailIsUsed = this.findUserByEmail(data.email);
        
        // if(emailIsUsed) {
        //     throw new NotAcceptableException("O usuário já existe");
        // }

        const userData = {
            ...data,
            password: await bcrypt.hash(data.password, 10),
        }

        const user = this.userRepository.create(userData);

        const userSaved = await this.userRepository.save(user);

        if(!userSaved) {
            throw new InternalServerErrorException(
                'Não foi possível salvar o usuário!'
            );
        }

        return {
            ...userSaved, 
            password: undefined
        };
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
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
        const user =  await this.userRepository.findOne({
            where: {email: email}
        });

        return user;
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<void> {  
        const user = await this.userRepository.findOneBy({ id: id });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        await this.userRepository.update(id, data);
        
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOneBy({ id: id });
        if(!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        await this.userRepository.delete(id);
    }

    async softDeleteUser(id: number): Promise<void> {
       const user = await this.userRepository.findOneBy({ id: id });
       
       if(!user) {
        throw new NotFoundException('Usuário não encontrado!');
       }
       
       await this.userRepository.softDelete(user);
    }
}
