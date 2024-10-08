const Product = require('../models/productModel');
const { body, validationResult } = require('express-validator');


const validateProduct = [
  body('title')
    .notEmpty().withMessage('Title is required.')
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters.'),
  body('short_description')
    .notEmpty().withMessage('Short description is required.')
    .isLength({ max: 500 }).withMessage('Short description must be less than 500 characters.'),
  body('description')
    .notEmpty().withMessage('Description is required.'),
  body('price')
    .isNumeric().withMessage('Price must be a number.')
    .custom((value) => value > 0).withMessage('Price must be greater than zero.'),
    body('category')
    .notEmpty().withMessage('Category is required.')
    .isIn(['painting', 'sculpture', 'photography']).withMessage('Category must be one of: painting, sculpture, photography.'),
  body('stock')
    .isNumeric().withMessage('Stock must be a number.')
    .custom((value) => value >= 0).withMessage('Stock must be greater than or equal to zero.')
];


exports.getAllProducts = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  try {
    const products = await Product.getAll();
    const productsWithImageUrl = products.map(product => {
      return {
        ...product,
        imageUrl: product.image ? `${baseUrl}/${product.image}` : null
      };
    });
    res.json(productsWithImageUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
}

  exports.getProductById = async (req, res) => {
    const { id } = req.params;
    const baseUrl = `${req.protocol}://${req.get('host')}`; 
  
    try {
      const product = await Product.getById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const productWithImageUrl = {
        ...product,
        imageUrl: product.image ? `${baseUrl}/${product.image}` : null
      };
  
      res.json(productWithImageUrl);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


exports.createProduct = [validateProduct ,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, short_description, description, price, category, stock } = req.body;
  const image = req.file ? req.file.path : null; 

  try {
    await Product.create(title,short_description, description, price, category, stock, image);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}];


exports.updateProduct = [validateProduct, async (req, res) => {
    const { id } = req.params; 
    const { title, short_description, description, price, category, stock } = req.body;
    const image = req.file ? req.file.path : null; 

    try {
      const product = await Product.getById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await Product.update(id, title, short_description, description, price, category, stock, image || product.image);
      
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }];
  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const product = await Product.getById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await Product.delete(id);
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.searchProducts = async (req, res) => {
    try {
      const { q, category, minPrice, maxPrice } = req.query; 
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const products = await Product.searchProducts(q || '', category, minPrice, maxPrice);

      const productsWithImageUrl = products.map(product => {
        return {
          ...product,
          imageUrl: product.image ? `${baseUrl}/${product.image}` : null 
        };
      });

      res.json(productsWithImageUrl);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  