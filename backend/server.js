const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const HOST = '0.0.0.0'; 

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const emailRouter = require('./routes/email');
const ordersRouter = require('./routes/orders');
const supplierRouter = require('./routes/suppliers');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const authRouter = require('./routes/auth');


app.use('/email', emailRouter);
app.use('/supplier', supplierRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/auth', authRouter);

app.listen(port,HOST, () => {
    console.log(`Server is running on port: ${port}:${HOST}`);
});