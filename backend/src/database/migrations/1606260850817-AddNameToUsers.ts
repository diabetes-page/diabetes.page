import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameToUsers1606260850817 implements MigrationInterface {
    name = 'AddNameToUsers1606260850817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

}
