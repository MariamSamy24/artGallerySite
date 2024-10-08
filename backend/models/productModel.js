// /models/productModel.js
const db = require('../config/db');

class Product {

  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
  }

  static async create(title,short_description, description, price, category, stock, image) {
    const sql = "INSERT INTO products (title, short_description,description, price, category, stock, image) VALUES (?, ?, ?, ?, ?, ?,?)";
    await db.execute(sql, [title, short_description, description, price, category, stock, image]);
  }

  static async getById(id) {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  }

  static async update(id, title,short_description, description, price, category, stock, image) {
    const sql = "UPDATE products  title = ?, short_description = ?, description = ?, price = ?, category = ?, stock = ?, image = ? WHERE id = ?";
    await db.execute(sql, [title,short_description, description, price, category, stock, image, id]);
  }

  static async delete(id) {
    const sql = "DELETE FROM products WHERE id = ?";
    await db.execute(sql, [id]);
  }

  static async searchProducts(searchTerm, category, minPrice, maxPrice) {
    let sql = "SELECT * FROM products WHERE title LIKE ?";
    const params = [`%${searchTerm}%`];

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    // Add price range filter if provided
    if (minPrice !== undefined && maxPrice !== undefined) {
      sql += " AND price BETWEEN ? AND ?";
      params.push(minPrice, maxPrice);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  }
}



module.exports = Product;
