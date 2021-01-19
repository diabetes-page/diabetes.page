import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1611051379169 implements MigrationInterface {
    name = 'InitialMigration1611051379169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "manager" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "consultantId" integer NOT NULL, CONSTRAINT "REL_f8e286f771af52d79baf5a8ad9" UNIQUE ("consultantId"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultant" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "REL_b96a6e5b600ceaad3d0baa2902" UNIQUE ("userId"), CONSTRAINT "PK_fc6968da0e8b2cb9315222e4bc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customized_training" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "consultantId" integer NOT NULL, "trainingTemplateId" integer NOT NULL, CONSTRAINT "UQ_8d4deb3b94d733c88b9c71a3e5f" UNIQUE ("consultantId", "trainingTemplateId"), CONSTRAINT "PK_6af78ac8fa2d7eff38077e50fcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training_template" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "documentPath" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_abb56b1486ea4305e5ff6d95998" UNIQUE ("name"), CONSTRAINT "UQ_96b0566ec0031a04b485c299ce0" UNIQUE ("documentPath"), CONSTRAINT "PK_df9bb87daaff77005dc0a0cf589" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "verificationToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "clientId" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "conferenceRoom" uuid NOT NULL DEFAULT uuid_generate_v4(), "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "presentationIndex" integer NOT NULL, "conferenceUpdateCounter" integer NOT NULL, "officialMessagePublicKey" character varying NOT NULL, "officialMessagePrivateKey" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cc025b375d31dae603cd4caf53e" PRIMARY KEY ("id", "conferenceRoom"))`);
        await queryRunner.query(`CREATE TABLE "client_training_templates_training_template" ("clientId" integer NOT NULL, "trainingTemplateId" integer NOT NULL, CONSTRAINT "PK_183fade24372e04c67cfe8bc46a" PRIMARY KEY ("clientId", "trainingTemplateId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e96a596f673a113ed2527850d3" ON "client_training_templates_training_template" ("clientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce78ad67ec4b642846b84e0812" ON "client_training_templates_training_template" ("trainingTemplateId") `);
        await queryRunner.query(`CREATE TABLE "appointment_users_user" ("appointmentId" integer NOT NULL, "appointmentConferenceRoom" uuid NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c6e4e2ea5342095a14e866af3c8" PRIMARY KEY ("appointmentId", "appointmentConferenceRoom", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3e7fa71fe9462de54d6ebf2aa" ON "appointment_users_user" ("appointmentId", "appointmentConferenceRoom") `);
        await queryRunner.query(`CREATE INDEX "IDX_88ac9bb2d40d6cafc6fa896efb" ON "appointment_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_f8e286f771af52d79baf5a8ad91" FOREIGN KEY ("consultantId") REFERENCES "consultant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "consultant" ADD CONSTRAINT "FK_b96a6e5b600ceaad3d0baa29029" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "customized_training" ADD CONSTRAINT "FK_75e6bf88c061e87b24e4c716400" FOREIGN KEY ("consultantId") REFERENCES "consultant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "customized_training" ADD CONSTRAINT "FK_987739950aa0dc930fc9b6dc3d3" FOREIGN KEY ("trainingTemplateId") REFERENCES "training_template"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_training_templates_training_template" ADD CONSTRAINT "FK_e96a596f673a113ed2527850d39" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_training_templates_training_template" ADD CONSTRAINT "FK_ce78ad67ec4b642846b84e08124" FOREIGN KEY ("trainingTemplateId") REFERENCES "training_template"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_users_user" ADD CONSTRAINT "FK_f3e7fa71fe9462de54d6ebf2aaa" FOREIGN KEY ("appointmentId", "appointmentConferenceRoom") REFERENCES "appointment"("id","conferenceRoom") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_users_user" ADD CONSTRAINT "FK_88ac9bb2d40d6cafc6fa896efb8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_users_user" DROP CONSTRAINT "FK_88ac9bb2d40d6cafc6fa896efb8"`);
        await queryRunner.query(`ALTER TABLE "appointment_users_user" DROP CONSTRAINT "FK_f3e7fa71fe9462de54d6ebf2aaa"`);
        await queryRunner.query(`ALTER TABLE "client_training_templates_training_template" DROP CONSTRAINT "FK_ce78ad67ec4b642846b84e08124"`);
        await queryRunner.query(`ALTER TABLE "client_training_templates_training_template" DROP CONSTRAINT "FK_e96a596f673a113ed2527850d39"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"`);
        await queryRunner.query(`ALTER TABLE "customized_training" DROP CONSTRAINT "FK_987739950aa0dc930fc9b6dc3d3"`);
        await queryRunner.query(`ALTER TABLE "customized_training" DROP CONSTRAINT "FK_75e6bf88c061e87b24e4c716400"`);
        await queryRunner.query(`ALTER TABLE "consultant" DROP CONSTRAINT "FK_b96a6e5b600ceaad3d0baa29029"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_f8e286f771af52d79baf5a8ad91"`);
        await queryRunner.query(`DROP INDEX "IDX_88ac9bb2d40d6cafc6fa896efb"`);
        await queryRunner.query(`DROP INDEX "IDX_f3e7fa71fe9462de54d6ebf2aa"`);
        await queryRunner.query(`DROP TABLE "appointment_users_user"`);
        await queryRunner.query(`DROP INDEX "IDX_ce78ad67ec4b642846b84e0812"`);
        await queryRunner.query(`DROP INDEX "IDX_e96a596f673a113ed2527850d3"`);
        await queryRunner.query(`DROP TABLE "client_training_templates_training_template"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "training_template"`);
        await queryRunner.query(`DROP TABLE "customized_training"`);
        await queryRunner.query(`DROP TABLE "consultant"`);
        await queryRunner.query(`DROP TABLE "manager"`);
    }

}
