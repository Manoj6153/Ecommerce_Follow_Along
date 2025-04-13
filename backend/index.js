const express=require('express');
const app=express();
const cors=require('cors');
const connectDB=require('./src/Database/db');
const userRouter=require('./src/Controllers/user');
const productRouter=require('./src/Controllers/Products');
const orderrouter = require('./src/Controllers/Order');

require('dotenv').config({
    path:'./src/Config/.env'
});

app.use(cors());    
const port=process.env.port;
const url=process.env.db_url;

app.listen(port,async ()=>{
    console.log(`Server is running on port ${port}`);
    try{
        await connectDB(url);
    }catch(error){
        console.log(error);
    }
})

app.use('/uploads', express.static('../backend/uploads'));

app.use(express.json());

 app.use('/auth',userRouter)

 app.use('/product',productRouter)

 app.use('/order',orderrouter)
 
 app.use('/productUploads', express.static('../backend/productUploads'));

 