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
    let sql = "SELECT orders.*, users.name , users.email  FROM orders inner join users on users.id = orders.user_id where users.name like ? ";
    const params = [`%${customer_name}%`];

    if (id) {
      sql += " or orders.id = ?";
      params.push(id);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  }


  static async createOrder(ordersDetails, user_id){
    let total  = 0;
    for(var i=0; i < ordersDetails.length; i++){
        total += (ordersDetails[i].price * ordersDetails[i].quantity);
    }

    let orderSql = "insert into orders(user_id,order_date,total_amount , status) values(? , ? , ? , 'pending')"
    let resultOrder = await db.execute(orderSql, [user_id , Date.now(), total]);
  
    for(var i=0; i < ordersDetails.length; i++){
      let orderDetailsSql = "insert into order_details (order_id,product_id, quantity,price) values(? , ? , ? , ?)"
      let resultOrderDetails = await db.execute(orderDetailsSql, [resultOrder.id , ordersDetails[i].product_id, ordersDetails[i].quantity, ordersDetails[i].price]);
    }
  }
}


module.exports = Order;
