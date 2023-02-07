import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;
}