import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeVerificationTokenUnique1615131500809
  implements MigrationInterface {
  name = 'MakeVerificationTokenUnique1615131500809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."verificationToken" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_794bd8703f438830940f4570a19" UNIQUE ("verificationToken")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_794bd8703f438830940f4570a19"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."verificationToken" IS NULL`,
    );
  }
}
