import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEncryptionColumnsToAppointments1607952501134 implements MigrationInterface {
    name = 'AddEncryptionColumnsToAppointments1607952501134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" ADD "officialMessagesPublicKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "officialMessagesPrivateKey" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "officialMessagesPrivateKey"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "officialMessagesPublicKey"`);
    }

}
