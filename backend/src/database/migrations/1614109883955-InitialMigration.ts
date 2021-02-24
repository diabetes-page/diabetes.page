import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1614109883955 implements MigrationInterface {
    name = 'InitialMigration1614109883955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "learning_base" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_236f0a8eed6c2d388cf351573a2" UNIQUE ("name"), CONSTRAINT "PK_335681c4f7fef6d72d580bdc36e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "learningBaseId" integer NOT NULL, CONSTRAINT "UQ_df2424b254aa09382183d057f6a" UNIQUE ("learningBaseId", "name"), CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "verificationToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "working_group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "creatorId" integer NOT NULL, CONSTRAINT "UQ_bcdcf261e0cbbcf1e21d37a7c7f" UNIQUE ("name", "creatorId"), CONSTRAINT "PK_9cbcc6e96966bec27f605e3c9f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manager" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "consultantId" integer NOT NULL, CONSTRAINT "REL_f8e286f771af52d79baf5a8ad9" UNIQUE ("consultantId"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "REL_b96a6e5b600ceaad3d0baa2902" UNIQUE ("userId"), CONSTRAINT "PK_fc6968da0e8b2cb9315222e4bc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "topicId" integer NOT NULL, "creatorId" integer NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "conferenceRoom" uuid NOT NULL DEFAULT uuid_generate_v4(), "slideIndex" integer NOT NULL, "conferenceUpdateCounter" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "trainingId" integer, "presenterId" integer NOT NULL, CONSTRAINT "UQ_2424bd2af5b76462d393be12698" UNIQUE ("conferenceRoom"), CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "working_group_users_user" ("workingGroupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e5775baa3d24d15c23f6a361dfc" PRIMARY KEY ("workingGroupId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e1e9b30b335c2c1bda02ff399" ON "working_group_users_user" ("workingGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d12e5c78143b274d63de67f5cd" ON "working_group_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "working_group_appointments_appointment" ("workingGroupId" integer NOT NULL, "appointmentId" integer NOT NULL, CONSTRAINT "PK_ae30cf21e883e5fda8ce1c6cb81" PRIMARY KEY ("workingGroupId", "appointmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c26399e156573d2e85b63adcd" ON "working_group_appointments_appointment" ("workingGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cadd423f542c47a000bb32641" ON "working_group_appointments_appointment" ("appointmentId") `);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_7d4455ef60fdedf0f557294154b" FOREIGN KEY ("learningBaseId") REFERENCES "learning_base"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_group" ADD CONSTRAINT "FK_5aef6c5d523ddf9d1875e602cf0" FOREIGN KEY ("creatorId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_f8e286f771af52d79baf5a8ad91" FOREIGN KEY ("consultantId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultant" ADD CONSTRAINT "FK_b96a6e5b600ceaad3d0baa29029" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_6dfac2a1dc6d4dce508bc494daf" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_c8d918bb5ced142f38c283059f8" FOREIGN KEY ("creatorId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_603be307248b66135ffdf1aeac0" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_752ee5dc613100d96b3561fe717" FOREIGN KEY ("presenterId") REFERENCES "consultant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_group_users_user" ADD CONSTRAINT "FK_3e1e9b30b335c2c1bda02ff399f" FOREIGN KEY ("workingGroupId") REFERENCES "working_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_group_users_user" ADD CONSTRAINT "FK_d12e5c78143b274d63de67f5cdb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_group_appointments_appointment" ADD CONSTRAINT "FK_1c26399e156573d2e85b63adcd3" FOREIGN KEY ("workingGroupId") REFERENCES "working_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_group_appointments_appointment" ADD CONSTRAINT "FK_9cadd423f542c47a000bb326413" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "working_group_appointments_appointment" DROP CONSTRAINT "FK_9cadd423f542c47a000bb326413"`);
        await queryRunner.query(`ALTER TABLE "working_group_appointments_appointment" DROP CONSTRAINT "FK_1c26399e156573d2e85b63adcd3"`);
        await queryRunner.query(`ALTER TABLE "working_group_users_user" DROP CONSTRAINT "FK_d12e5c78143b274d63de67f5cdb"`);
        await queryRunner.query(`ALTER TABLE "working_group_users_user" DROP CONSTRAINT "FK_3e1e9b30b335c2c1bda02ff399f"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_752ee5dc613100d96b3561fe717"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_603be307248b66135ffdf1aeac0"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_c8d918bb5ced142f38c283059f8"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_6dfac2a1dc6d4dce508bc494daf"`);
        await queryRunner.query(`ALTER TABLE "consultant" DROP CONSTRAINT "FK_b96a6e5b600ceaad3d0baa29029"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_f8e286f771af52d79baf5a8ad91"`);
        await queryRunner.query(`ALTER TABLE "working_group" DROP CONSTRAINT "FK_5aef6c5d523ddf9d1875e602cf0"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_7d4455ef60fdedf0f557294154b"`);
        await queryRunner.query(`DROP INDEX "IDX_9cadd423f542c47a000bb32641"`);
        await queryRunner.query(`DROP INDEX "IDX_1c26399e156573d2e85b63adcd"`);
        await queryRunner.query(`DROP TABLE "working_group_appointments_appointment"`);
        await queryRunner.query(`DROP INDEX "IDX_d12e5c78143b274d63de67f5cd"`);
        await queryRunner.query(`DROP INDEX "IDX_3e1e9b30b335c2c1bda02ff399"`);
        await queryRunner.query(`DROP TABLE "working_group_users_user"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP TABLE "consultant"`);
        await queryRunner.query(`DROP TABLE "manager"`);
        await queryRunner.query(`DROP TABLE "working_group"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "topic"`);
        await queryRunner.query(`DROP TABLE "learning_base"`);
    }

}
