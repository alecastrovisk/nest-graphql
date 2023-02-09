import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db',
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*.js"],
    synchronize: false
}

export default TypeOrmConfig;