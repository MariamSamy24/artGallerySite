const Order = require('../models/orderModel');
const sendMail = require('../utils/sendMail');


exports.getAllOrders = async (req, res) => {
  
  try {
    
    const orders = await Order.getAll();
    res.json({orders});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};

exports.searchOrders = async (req, res) => {
  try {
    const {  q } = req.query; 
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 100; 
    const offset = (page - 1) * limit;

    const {orders,total} = await Order.searchOrders(q || '',limit, offset);

    res.status(200).json({
      orders,
      page, 
      totalPages: Math.ceil(total / limit), 
      totalProducts: total 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getByUserId = async (req, res) => {
  let { user_id } = req.query;
  if(user_id == null || user_id === ""){
    user_id =  req.user.id;
  }
  const { fromDate, toDate, status } = req.query;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  try {
    const orders = await Order.getAllByUserId(user_id, fromDate, toDate, status, baseUrl );
    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: 'No orders found for this user' });
    }

    res.json({orders});
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  exports.getByOrderId = async (req, res) => {
    const { id } = req.params;
    
  
    try {
      const {order, orders_details} = await Order.getByOrderId(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ order,orders_details});
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.createOrder = async (req, res) => {
    try {
      const { ordersDetails,user_name, user_Address, user_Telephone, payment_type} = req.body; 
      const user_id =  req.user.id;
     
      const orders = await Order.createOrder(ordersDetails, user_name,user_id, user_Address, user_Telephone, payment_type);
  
     // const user_email=  req.user.email;
      //await sendMail.sendOrderConfirmationEmail(user_email, orders.id, orders.totalAmount, user_name);

      res.status(201).json({orderId: orders.id, total: orders.totalAmount});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



exports.updateOrder =  async (req, res) => {
    const {id} = req.params; 
    const {status} = req.body;
    
    try {
      const orderById = await Order.getByOrderId(id);
      if (!orderById) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      await Order.update(id,status);
      
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

  