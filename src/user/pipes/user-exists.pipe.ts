import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../user.entity";

@Injectable()
export class UserExistsPipe implements PipeTransform {
    constructor(private userRepository: Repository<User>) { }

    async transform(value: any, metadata: ArgumentMetadata) {
        const user = await this.userRepository.findOneBy({ id: value });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado!');
        }

        return value;
    }
}