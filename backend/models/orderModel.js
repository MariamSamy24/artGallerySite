// /models/ordersModel.js
const db = require('../config/db');

class Order {

  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM orders ORDER  BY order_date DESC");
    return rows;
  }
  static async getAllByUserId(user_id, fromDate, toDate, status, baseUrl) {
    let query = `
      SELECT orders.*, order_details.id order_detail_id, order_details.quantity, order_details.price, title, image
      FROM orders 
      LEFT JOIN order_details ON orders.id = order_details.order_id
      LEFT join products on order_details.product_id =products.id
      WHERE orders.user_id = ?`;

    const params = [user_id];

    if (fromDate) {
        query += ` AND order_date >= ?`;
        params.push(fromDate);
    }
    if (toDate) {
        query += ` AND order_date <= ?`;
        params.push(toDate);
    }
    if (status) {
        query += ` AND orders.status LIKE ?`;
        params.push(`%${status}%`);
    }

    query += ` ORDER BY orders.order_date DESC`;

    const [rows] = await db.execute(query, params);

    const orders = [];

    rows.forEach(row => {
        let existingOrder = orders.find(order => order.id === row.id);

        if (!existingOrder) {
            existingOrder = {
                id: row.id,
                user_id: row.user_id,
                order_date: row.order_date,
                total_amount: row.total_amount,
                status: row.status,
                order_details: []
            };
            orders.push(existingOrder);
        }
        
        if (row.order_detail_id) {
            existingOrder.order_details.push({
                imageUrl: `${baseUrl}/${row.image}`,
                title: row.title,
                quantity: row.quantity,
                price: row.price
            });
        }
    });

    return orders;
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


  static async searchOrders(q, limit, offset) {
    let query = `SELECT SQL_CALC_FOUND_ROWS orders.*, users.name, users.email 
      FROM orders
      INNER JOIN users ON users.id = orders.user_id `;
  
    if (q && !isNaN(q)) {
      query += `WHERE orders.id = ${q}`;
     
    } else if(q) {
      query += `WHERE users.name LIKE '%${q}%'`;
    }

    query += ` ORDER BY orders.order_date DESC`;
    query += ` LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
    const [orders] = await db.execute(query);
    const [[{ total }]] = await db.execute("SELECT FOUND_ROWS() as total");
    return { orders, total };
  }

  static async createOrder(ordersDetails, user_name, user_id, user_Address, user_Telephone, payment_type){
    let total  = 0;
    for(var i=0; i < ordersDetails.length; i++){
        total += (ordersDetails[i].price * ordersDetails[i].quantity);
    }

    try{

      let orderSql = "insert into orders(user_id, user_name,order_date,total_amount , status, user_Address, user_Telephone, payment_type) values(? , ? , ? , ? , 'pending', ? , ? , ?)"
      let [resultOrder] = await db.execute(orderSql, [user_id ,user_name, new Date(), total, user_Address, user_Telephone, payment_type]);
      let orderId = resultOrder.insertId;

      for(var i=0; i < ordersDetails.length; i++){
        let orderDetailsSql = "insert into order_details (order_id,product_id, quantity,price) values(? , ? , ? , ?)"
         await db.execute(orderDetailsSql, [orderId , ordersDetails[i].product_id, ordersDetails[i].quantity, ordersDetails[i].price]);
        
         let updateProduct ="update products set stock = stock - ? where id= ?";
         await db.execute(updateProduct, [ordersDetails[i].quantity, ordersDetails[i].product_id])

      }

      return { id: orderId, totalAmount: total };

  }catch (error) {
    throw error; 
  }
}
}


module.exports = Order;
