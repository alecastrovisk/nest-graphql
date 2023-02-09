import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

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

    @ApiProperty({
        example: 18
    })
    @IsNumber()
    age: number;
}