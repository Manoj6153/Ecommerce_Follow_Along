const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './src/Config/.env' });

const connectDB = require('./src/Database/db');
const userRouter = require('./src/Controllers/user');
const productRouter = require('./src/Controllers/Products');
const orderRouter = require('./src/Controllers/Order');

const app = express();
const port = process.env.port || 3000;
const url = process.env.db_url;

app.use(cors());
app.use(express.json());

// ✅ Serve static files using absolute paths
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/productUploads', express.static(path.join(__dirname, 'productUploads')));

// ✅ Routes
app.use('/auth', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// ✅ DB and server startup
app.listen(port, async () => {
  console.log(`✅ Server running on port ${port}`);
  try {
    await connectDB(url);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error);
  }
});
