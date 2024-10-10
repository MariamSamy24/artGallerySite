const Category = require('../models/categoryModel');


exports.getAllCategories = async (req, res) => {
  try {
    const categories = Category.getCategories();
    res.status(200).json({ categories});
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  };
}