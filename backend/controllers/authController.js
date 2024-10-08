const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await User.create(name, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Check your E-mail or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Check your E-mail or Password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role},
       process.env.JWT_SECRET, 
       {  algorithm: 'HS256', expiresIn: '1h' });

       const refreshToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        process.env.JWT_SECRET, 
        { algorithm: 'HS256', expiresIn: '15d' } 
    );
    res.json({ token , refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.token  = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401); 
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid refresh token

      const newAccessToken = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          {  algorithm: 'HS256', expiresIn: '1h' } 
      );

      res.json({
          accessToken: newAccessToken
      });
  });
};
