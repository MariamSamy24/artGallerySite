// /models/productModel.js
const db = require('../config/db');

class Product {
  static async getAll(limit, offset) {
    const query = `SELECT * FROM products LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
    const [rows] = await db.execute(query);

    const [totalRows] = await db.execute("SELECT COUNT(*) as total FROM products");
    const total = totalRows[0].total;

    return { products: rows, total };
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
    const sql = "UPDATE products SET title = ?, short_description = ?, description = ?, price = ?, category = ?, stock = ?, image = ? WHERE id = ?";
    await db.execute(sql, [title,short_description, description, price, category, stock, image, id]);
  }

  static async delete(id) {
    const sql = "DELETE FROM products WHERE id = ?";
    await db.execute(sql, [id]);
  }

  static async searchProducts(q, category, minPrice, maxPrice, limit, offset) {
    try {
        let query = "SELECT SQL_CALC_FOUND_ROWS * FROM products WHERE 1=1";
        let queryParams = [];

        if (q) {
          query += " AND (title LIKE ? OR short_description LIKE ? OR description LIKE ?)";
          const searchQuery = `%${q}%`;
          queryParams.push(searchQuery, searchQuery, searchQuery);
        }
        
        if (category) {
          query += " AND category = ?";
          queryParams.push(category);
        }
      
        if (minPrice !== undefined) {
          query += " AND price >= ?";
          queryParams.push(Number(minPrice));  
        }
      
        if (maxPrice !== undefined) {
          query += " AND price <= ?";
          queryParams.push(Number(maxPrice)); 
        }
      
       query += ` LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;

      const [products] = await db.execute(query, queryParams);
      const [[{ total }]] = await db.execute("SELECT FOUND_ROWS() as total");

      return { products, total };
    } catch (err) {
      console.error("Database error:", err);
      throw new Error("Database query failed");
    }
  }
}



module.exports = Product;
