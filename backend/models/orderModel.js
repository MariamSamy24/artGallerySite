// /models/ordersModel.js
const db = require('../config/db');

class Order {

  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM orders ORDER  BY order_date DESC");
    return rows;
  }
  static async getAllByUserId(user_id) {
    const [rows] = await db.execute("SELECT * FROM orders  where user_id = ? ORDER  BY order_date DESC",[user_id]);
    return rows;
  }



  static async update(id,status) {
    const sql = "UPDATE orders set status = ?  WHERE id = ?";
    await db.execute(sql, [status,id]);
  }

  static async getByOrderId(id)  {
    const [orders] = await db.execute("SELECT orders.* , users.name , users.email FROM orders inner join  users on users.id = orders.user_id inner join  order_details on orders.id = order_details.order_id  where orders.id = ?",[id]);
    const [orders_details] = await db.execute("select quantity, title,order_details.price from order_details inner join products on order_details.product_id =products.id where order_id = ?",[id]);
    return { order:orders[0],orders_details};
  }


 

  static async searchOrders(id, customer_name) {
    console.log(customer_name +" fff "+ id);
    let sql = "SELECT * FROM orders inner join users on users.id = orders.user_id where users.name like ? ";
    const params = [`%${customer_name}%`];

    if (id) {
      sql += " or orders.id = ?";
      params.push(id);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  }
}



module.exports = Order;
