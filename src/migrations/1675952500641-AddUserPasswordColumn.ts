import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPasswordColumn1675952500641 implements MigrationInterface {
    name = 'AddUserPasswordColumn1675952500641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
