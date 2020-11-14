import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAppointmentsTable1605355243505 implements MigrationInterface {
    name = 'CreateAppointmentsTable1605355243505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "conferenceRoom" uuid NOT NULL DEFAULT uuid_generate_v4(), "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cc025b375d31dae603cd4caf53e" PRIMARY KEY ("id", "conferenceRoom"))`);
        await queryRunner.query(`CREATE TABLE "appointment_users_user" ("appointmentId" integer NOT NULL, "appointmentConferenceRoom" uuid NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c6e4e2ea5342095a14e866af3c8" PRIMARY KEY ("appointmentId", "appointmentConferenceRoom", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3e7fa71fe9462de54d6ebf2aa" ON "appointment_users_user" ("appointmentId", "appointmentConferenceRoom") `);
        await queryRunner.query(`CREATE INDEX "IDX_88ac9bb2d40d6cafc6fa896efb" ON "appointment_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment_users_user" ADD CONSTRAINT "FK_f3e7fa71fe9462de54d6ebf2aaa" FOREIGN KEY ("appointmentId", "appointmentConferenceRoom") REFERENCES "appointment"("id","conferenceRoom") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_users_user" ADD CONSTRAINT "FK_88ac9bb2d40d6cafc6fa896efb8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_users_user" DROP CONSTRAINT "FK_88ac9bb2d40d6cafc6fa896efb8"`);
        await queryRunner.query(`ALTER TABLE "appointment_users_user" DROP CONSTRAINT "FK_f3e7fa71fe9462de54d6ebf2aaa"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_88ac9bb2d40d6cafc6fa896efb"`);
        await queryRunner.query(`DROP INDEX "IDX_f3e7fa71fe9462de54d6ebf2aa"`);
        await queryRunner.query(`DROP TABLE "appointment_users_user"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
