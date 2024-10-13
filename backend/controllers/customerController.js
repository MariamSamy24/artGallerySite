const Customer = require('../models/customerModel');




  exports.getAllCustomer = async (req, res) => {
    
   
  
    try {
      const customers = await Customer.getAllCusomers();
      if (!customers) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
    
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  