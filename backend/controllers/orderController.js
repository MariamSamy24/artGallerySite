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
    console.log("ff" + req);
    const {  order_id, customer_name} = req.query; 
   
    console.log("c " +customer_name+ "id " + order_id);
    const orders = await Order.searchOrders(order_id, customer_name);

    res.json({orders});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await Order.getAllByUserId(user_id );
    if (!orders) {
      return res.status(404).json({ message: 'Orders not found' });
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
  
  

  