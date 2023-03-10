import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateUserDTO {
    @ApiProperty({
        example: 'Alexandre Filho',
    })
    @IsString()
    @IsNotEmpty({ message: 'O campo não pode ser vazio!' })
    name?: string;

    @ApiProperty({
        example: 'alexestagiario@email.com',
    })
    @IsEmail()
    @IsNotEmpty({ message: 'O campo não pode ser vazio!' })
    email?: string;

    // @ApiProperty({
    //     example: 25,
    // })
    // @IsNumber()
    // age?: number;
}