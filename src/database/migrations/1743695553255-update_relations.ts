import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelations1743695553255 implements MigrationInterface {
    name = 'UpdateRelations1743695553255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_a4cbb79cde91bc0bb2bc1b1f615"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "REL_a4cbb79cde91bc0bb2bc1b1f61"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "company_id" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_a0503db1630a5b8a4d7deabd556" UNIQUE ("company_id")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_a0503db1630a5b8a4d7deabd556" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_a0503db1630a5b8a4d7deabd556"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_a0503db1630a5b8a4d7deabd556"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "REL_a4cbb79cde91bc0bb2bc1b1f61" UNIQUE ("productId")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_a4cbb79cde91bc0bb2bc1b1f615" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
