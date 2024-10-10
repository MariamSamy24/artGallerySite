const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

//const bcrypt = require('bcrypt');
//const crypto = require('crypto');

// async function hashPassword(password) {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log(`${password} is hashed password to: ${hashedPassword}`);
// }

// hashPassword('Admin@1234');

// const your_jwt_secret_key = crypto.randomBytes(32).toString('hex');
// console.log('jwt  ' + your_jwt_secret_key);



const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));    