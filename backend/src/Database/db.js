const x = require('mongoose');
require('dotenv').config({
    path:'../Config/.env'
});

const connectDB=async(url)=>{
    try {
        await x.connect(url);
        console.log(`MongoDB connected successfully`);
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectDB;