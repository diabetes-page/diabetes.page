import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConferenceUpdateCounterColumnToAppointments1609154131915 implements MigrationInterface {
    name = 'AddConferenceUpdateCounterColumnToAppointments1609154131915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "conferenceUpdateCounter" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "conferenceUpdateCounter"`);
    }

}
