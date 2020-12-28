import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEncryptionColumnsToAppointments1607952501134
  implements MigrationInterface {
  name = 'AddEncryptionColumnsToAppointments1607952501134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "officialMessagePublicKey" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "officialMessagePrivateKey" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP COLUMN "officialMessagePrivateKey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP COLUMN "officialMessagePublicKey"`,
    );
  }
}
