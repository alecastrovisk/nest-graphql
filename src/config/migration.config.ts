import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db',
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false
})

dataSource.initialize();

export default dataSource;