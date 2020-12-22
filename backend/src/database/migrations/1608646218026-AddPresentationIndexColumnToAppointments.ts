import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPresentationIndexColumnToAppointments1608646218026 implements MigrationInterface {
    name = 'AddPresentationIndexColumnToAppointments1608646218026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "presentationIndex" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "presentationIndex"`);
    }

}
