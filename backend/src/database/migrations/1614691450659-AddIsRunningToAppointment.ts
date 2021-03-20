import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsRunningToAppointment1614691450659
  implements MigrationInterface {
  name = 'AddIsRunningToAppointment1614691450659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD "isRunning" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP COLUMN "isRunning"`,
    );
  }
}
