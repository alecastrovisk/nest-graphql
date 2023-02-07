import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty({ message: 'O campo não pode ser vazio!'})
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'O campo não pode ser vazio!'})
    email: string;
}