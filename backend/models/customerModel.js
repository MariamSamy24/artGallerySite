const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Customer {
  static async getAllCusomers() {
    const [rows] = await db.execute("SELECT name,email,id FROM users where role = 'customer' ");
    return rows;
  }
}

module.exports = Customer;
