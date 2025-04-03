import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTabels1743688886329 implements MigrationInterface {
    name = 'CreateTabels1743688886329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyName\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`companyName\` varchar(100) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`productId\` int NULL, UNIQUE INDEX \`REL_a4cbb79cde91bc0bb2bc1b1f61\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productName\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_a4cbb79cde91bc0bb2bc1b1f615\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0dce9bc93c2d2c399982d04bef1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0dce9bc93c2d2c399982d04bef1\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_a4cbb79cde91bc0bb2bc1b1f615\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`REL_a4cbb79cde91bc0bb2bc1b1f61\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
