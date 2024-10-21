const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');

exports.register = async (req, res) => {
  try {
     const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    await User.create(name, email, password);
    await sendMail.sendRegistrationEmail(email, name);
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
       {  algorithm: 'HS256', expiresIn: '1d' });

       const refreshToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role }, 
        process.env.JWT_SECRET, 
        { algorithm: 'HS256', expiresIn: '15d' } 
    );
    res.json({ token , refreshToken ,userId : user.id, name: user.name });
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


function validatePasswordStrength(password) {
  const minLength = 8;
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  if (!uppercase.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!lowercase.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!number.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!specialChar.test(password)) {
    return 'Password must contain at least one special character';
  }

  return null;
}
