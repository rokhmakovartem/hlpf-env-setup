import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToProducts1700000002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products
      ADD COLUMN "isActive" BOOLEAN DEFAULT true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products
      DROP COLUMN "isActive"
    `);
  }
}