import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1614517900541 implements MigrationInterface {
  name = 'InitialMigration1614517900541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "teachingBaseId" uuid NOT NULL, CONSTRAINT "UQ_cc743fc794124b3d6e5b65b28ce" UNIQUE ("teachingBaseId", "name"), CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teaching_base" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_93144e029694c49d2e9b8211d1a" UNIQUE ("name"), CONSTRAINT "PK_93bfc92b40d26b4890fc26efd96" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "teaching_base_document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "documentPath" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "teachingBaseId" uuid NOT NULL, CONSTRAINT "UQ_f9f55ac3b4e7f529f63aa7491be" UNIQUE ("teachingBaseId", "name"), CONSTRAINT "UQ_ddfd2d9367ba230545ae558e3c4" UNIQUE ("teachingBaseId", "documentPath"), CONSTRAINT "PK_42d545c9baae107a0490fd02472" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "verificationToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "working_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creatorId" uuid NOT NULL, CONSTRAINT "UQ_bcdcf261e0cbbcf1e21d37a7c7f" UNIQUE ("name", "creatorId"), CONSTRAINT "PK_9cbcc6e96966bec27f605e3c9f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "consultantId" uuid NOT NULL, CONSTRAINT "REL_f8e286f771af52d79baf5a8ad9" UNIQUE ("consultantId"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "consultant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, CONSTRAINT "REL_b96a6e5b600ceaad3d0baa2902" UNIQUE ("userId"), CONSTRAINT "PK_fc6968da0e8b2cb9315222e4bc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "training" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slides" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "teachingBaseDocumentId" uuid NOT NULL, "topicId" uuid NOT NULL, "creatorId" uuid NOT NULL, CONSTRAINT "UQ_85d7aa6bf8c4547bbf63add1080" UNIQUE ("name", "creatorId"), CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "conferenceRoom" uuid NOT NULL DEFAULT uuid_generate_v4(), "slideIndex" integer NOT NULL, "conferenceUpdateCounter" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "trainingId" uuid, "presenterId" uuid NOT NULL, CONSTRAINT "UQ_2424bd2af5b76462d393be12698" UNIQUE ("conferenceRoom"), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "working_group_users_user" ("workingGroupId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_e5775baa3d24d15c23f6a361dfc" PRIMARY KEY ("workingGroupId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e1e9b30b335c2c1bda02ff399" ON "working_group_users_user" ("workingGroupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d12e5c78143b274d63de67f5cd" ON "working_group_users_user" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "working_group_appointments_appointment" ("workingGroupId" uuid NOT NULL, "appointmentId" uuid NOT NULL, CONSTRAINT "PK_ae30cf21e883e5fda8ce1c6cb81" PRIMARY KEY ("workingGroupId", "appointmentId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1c26399e156573d2e85b63adcd" ON "working_group_appointments_appointment" ("workingGroupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9cadd423f542c47a000bb32641" ON "working_group_appointments_appointment" ("appointmentId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_576ccb41cacf7ae3e3176c1105a" FOREIGN KEY ("teachingBaseId") REFERENCES "teaching_base"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "teaching_base_document" ADD CONSTRAINT "FK_02909b79eadf941755aaa80f3bc" FOREIGN KEY ("teachingBaseId") REFERENCES "teaching_base"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group" ADD CONSTRAINT "FK_5aef6c5d523ddf9d1875e602cf0" FOREIGN KEY ("creatorId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" ADD CONSTRAINT "FK_f8e286f771af52d79baf5a8ad91" FOREIGN KEY ("consultantId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultant" ADD CONSTRAINT "FK_b96a6e5b600ceaad3d0baa29029" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" ADD CONSTRAINT "FK_51e1b82f0dcc580f45b21547892" FOREIGN KEY ("teachingBaseDocumentId") REFERENCES "teaching_base_document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" ADD CONSTRAINT "FK_6dfac2a1dc6d4dce508bc494daf" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" ADD CONSTRAINT "FK_c8d918bb5ced142f38c283059f8" FOREIGN KEY ("creatorId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_603be307248b66135ffdf1aeac0" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_752ee5dc613100d96b3561fe717" FOREIGN KEY ("presenterId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_users_user" ADD CONSTRAINT "FK_3e1e9b30b335c2c1bda02ff399f" FOREIGN KEY ("workingGroupId") REFERENCES "working_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_users_user" ADD CONSTRAINT "FK_d12e5c78143b274d63de67f5cdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_appointments_appointment" ADD CONSTRAINT "FK_1c26399e156573d2e85b63adcd3" FOREIGN KEY ("workingGroupId") REFERENCES "working_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_appointments_appointment" ADD CONSTRAINT "FK_9cadd423f542c47a000bb326413" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "working_group_appointments_appointment" DROP CONSTRAINT "FK_9cadd423f542c47a000bb326413"`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_appointments_appointment" DROP CONSTRAINT "FK_1c26399e156573d2e85b63adcd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_users_user" DROP CONSTRAINT "FK_d12e5c78143b274d63de67f5cdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group_users_user" DROP CONSTRAINT "FK_3e1e9b30b335c2c1bda02ff399f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_752ee5dc613100d96b3561fe717"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_603be307248b66135ffdf1aeac0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" DROP CONSTRAINT "FK_c8d918bb5ced142f38c283059f8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" DROP CONSTRAINT "FK_6dfac2a1dc6d4dce508bc494daf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" DROP CONSTRAINT "FK_51e1b82f0dcc580f45b21547892"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultant" DROP CONSTRAINT "FK_b96a6e5b600ceaad3d0baa29029"`,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" DROP CONSTRAINT "FK_f8e286f771af52d79baf5a8ad91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "working_group" DROP CONSTRAINT "FK_5aef6c5d523ddf9d1875e602cf0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "teaching_base_document" DROP CONSTRAINT "FK_02909b79eadf941755aaa80f3bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_576ccb41cacf7ae3e3176c1105a"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_9cadd423f542c47a000bb32641"`);
    await queryRunner.query(`DROP INDEX "IDX_1c26399e156573d2e85b63adcd"`);
    await queryRunner.query(
      `DROP TABLE "working_group_appointments_appointment"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_d12e5c78143b274d63de67f5cd"`);
    await queryRunner.query(`DROP INDEX "IDX_3e1e9b30b335c2c1bda02ff399"`);
    await queryRunner.query(`DROP TABLE "working_group_users_user"`);
    await queryRunner.query(`DROP TABLE "appointment"`);
    await queryRunner.query(`DROP TABLE "training"`);
    await queryRunner.query(`DROP TABLE "consultant"`);
    await queryRunner.query(`DROP TABLE "manager"`);
    await queryRunner.query(`DROP TABLE "working_group"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "teaching_base_document"`);
    await queryRunner.query(`DROP TABLE "teaching_base"`);
    await queryRunner.query(`DROP TABLE "topic"`);
  }
}
