
const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name!"],
      },
      email:{
        type: String,
        required: [true, "Please enter your email!"],
      },
      password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"]
        
      },
      phoneNumber:{
        type: Number,
      },
      addresses:[
        {
          country: {
            type: String,
          },
          city:{
            type: String,
          },
          address1:{
            type: String,
          },
          address2:{
            type: String,
          },
          zipCode:{
            type: Number,
          },
          addressType:{
            type: String,
          },
        }
      ],
      role:{
        type: String,
        eval:["user","admin","seller"],
        default: "user",
      },
      avatar:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
     },
     createdAt:{
      type: Date,
      default: Date.now(),
     },
     cart: [{
      productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          unique: true,
          required: true,
      },
      productImages:{
        type: [String],
        required: true,
      },
      productName: {
          type: String,
          required: true,
      },
      quantity: {
          type: Number,
          required: true,
          min: 1,
      },
      price:{
        type:Number,
        required:true,
      }
  }],
     resetPasswordToken: String,
     resetPasswordTime: Date,

});

const userModel= mongoose.model('User',userSchema);

module.exports = userModel;
