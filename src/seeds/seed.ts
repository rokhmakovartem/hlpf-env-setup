import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'nestuser',
  password: process.env.POSTGRES_PASSWORD || 'nestpass',
  database: process.env.POSTGRES_DB || 'nestdb',
});

async function seed() {
  await ds.initialize();

  // Категорії
  const cats = ['Electronics', 'Accessories', 'Clothing'];
  const categoryIds: number[] = [];

  for (const name of cats) {
    const existing = await ds.query(
      `SELECT id FROM categories WHERE name = $1`,
      [name],
    );
    if (existing.length > 0) {
      categoryIds.push(existing[0].id);
    } else {
      const result = await ds.query(
        `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
        [name],
      );
      categoryIds.push(result[0].id);
    }
  }

  // Продукти
  const products = [
    { name: 'iPhone 16', price: 999, stock: 50, catIndex: 0 },
    { name: 'Galaxy S24', price: 849, stock: 40, catIndex: 0 },
    { name: 'MacBook Pro', price: 2499, stock: 15, catIndex: 0 },
    { name: 'iPad Air', price: 599, stock: 30, catIndex: 0 },
    { name: 'AirPods Pro', price: 249, stock: 100, catIndex: 1 },
    { name: 'USB-C Cable', price: 19, stock: 500, catIndex: 1 },
    { name: 'MagSafe Charger', price: 39, stock: 80, catIndex: 1 },
    { name: 'Laptop Sleeve', price: 49, stock: 60, catIndex: 1 },
    { name: 'T-Shirt Dev', price: 25, stock: 200, catIndex: 2 },
    { name: 'Hoodie NestJS', price: 55, stock: 75, catIndex: 2 },
  ];

  // Додати 30 записів (3 рази по 10)
  for (let i = 0; i < 3; i++) {
    for (const p of products) {
      const suffix = i > 0 ? ` v${i + 1}` : '';
      const productName = `${p.name}${suffix}`;

      // Перевірити чи продукт вже існує
      const existing = await ds.query(
        `SELECT id FROM products WHERE name = $1`,
        [productName],
      );

      if (existing.length === 0) {
        await ds.query(
          `INSERT INTO products (name, price, stock, category_id)
           VALUES ($1, $2, $3, $4)`,
          [productName, p.price + i * 10, p.stock, categoryIds[p.catIndex]],
        );
      }
    }
  }

  console.log('Seed complete: 3 categories, 30 products');
  await ds.destroy();
}

seed().catch(console.error);