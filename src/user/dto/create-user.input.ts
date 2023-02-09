import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString, MaxLength,
    MinLength
} from "class-validator";

@InputType()
export class CreateUserDTO {
    @ApiProperty({
        example: 'Alexandre Castro',
    })
    @IsString()
    @IsNotEmpty({ message: 'O campo não pode ser vazio!'})
    name: string;

    @ApiProperty({
        example: 'alex@email.com'
    })
    @IsEmail()
    @IsNotEmpty({ message: 'O campo não pode ser vazio!'})
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(8)
    @IsNotEmpty({ message: 'A senha não pode estar vazia!'})
    password: string;

    @ApiProperty({
        example: 18
    })
    @IsNumber()
    age: number;
}