import { Body, Controller, Get, OnModuleInit, Param, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateUserDTO } from './dto/create-user.input';
import { User } from './user.entity';

@ApiTags('users')
@Controller('user')
export class UserController implements OnModuleInit {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'user',
                brokers: ['localhost:9092']
            },
            consumer: {
                groupId: 'user-consumer',
                allowAutoTopicCreation: true
            }
        }
    })

    private client: ClientKafka;

    async onModuleInit() {
        const requestPatterns = [
            'find-all-users',
            'find-user',
            'create-user'
        ];

        requestPatterns.forEach(async pattern => {
            this.client.subscribeToResponseOf(pattern);
            await this.client.connect()
        })
    }

    @Post()
    create(@Body() data: CreateUserDTO): Observable<User> {
        const user = this.client.send('create-user', data);
        return user;
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.client.send('find-all-users', {});
    }

    @Get()
    findOne(@Param('id') id: number): Observable<User> {
        return this.client.send('find-user', { id });
    }

}