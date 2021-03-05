import {MigrationInterface, QueryRunner} from "typeorm";

export class MakePasswordNullableInUser1614709321589 implements MigrationInterface {
    name = 'MakePasswordNullableInUser1614709321589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
