const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(name, email, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')";
    await db.execute(sql, [name, email, hashedPassword]);
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }
}

module.exports = User;
