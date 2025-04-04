import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubCat1743742328628 implements MigrationInterface {
    name = 'CreateSubCat1743742328628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "subCategoryName" character varying NOT NULL, "category_id" integer, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_4ec8c495300259f2322760a39fa" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_4ec8c495300259f2322760a39fa"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
    }

}
