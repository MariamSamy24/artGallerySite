const Order = require('../models/orderModel');


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
    const {  order_id, customer_name} = req.query; 
   
    const orders = await Order.searchOrders(order_id, customer_name);

    res.json({orders});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getByUserId = async (req, res) => {
  let user_id =  req.user.id;
  const { fromDate, toDate, status } = req.query;
  
  try {
    const orders = await Order.getAllByUserId(user_id, fromDate, toDate, status );
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
      const order = await Order.getByOrderId(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.createOrder = async (req, res) => {
    try {
      const { ordersDetails, user_Address, user_Telephone, payment_type} = req.body; 
      const user_id =  req.user.id
      const orders = await Order.createOrder(ordersDetails, user_id, user_Address, user_Telephone, payment_type);
  
      res.status(201).json("Order Created successfully");
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
  
  

  