const {Router} = require('express')
const productModel = require('./../Model/productModel')
const {productUpload} = require('./../../multer')
const auth=require('./../Middleware/Auth')
const userModel = require('./../Model/userModel')
const path = require('path');
const mongoose = require('mongoose');

const productRouter=Router();

productRouter.get('/get-products',async (req,res)=>{
    try{
        const products = await productModel.find({})
        if (!products){
            return res.status(400).json({message:"No products foud"})
        }
        console.log(products)
        return res.status(200).json({products:products})
    }catch(err){
        console.log(err)
    }
})

productRouter.get('/get-my-products',auth,async (req,res)=>{
    try{
        console.log(req.user)
        const {email}=req.user
        const products = await productModel.find({email:email})
        if (products.length === 0){
            return res.status(400).json({message:"No products foud"})
        }
        console.log(products)
        return res.status(200).json({products:products})
    }catch(err){
        console.log(err)
    }   
})

productRouter.post('/post-product',productUpload.array('files'),async (req,res)=>{
    const {name,email,description,category,stock,tags,price} = req.body;
    const images=req.files.map(file=>file.path);
    try{
        if (images.length===0){
            return res.status(400).json({message:"Please upload atleast one images"})
        }
        const newProduct = await productModel.create({
            name:name,
            description:description,
            category:category,
            tags:tags,
            price:price,
            stock:stock,
            email:email,
            images:images
        })

        res.status(200).json({message:"Product created successfully",product:newProduct})
    }catch(err){
        console.log(err)
    }

})

productRouter.patch("/cart",auth, async(req, res) => {
    const {id, quantity} = req.body;

    try {
        if ( !id ||  !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const findEmail = req.user
        if (!findEmail) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        if (quantity < 0 || !quantity) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const findProduct = await productModel.findById(id);
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const findUser = await userModel.findOne({ email: findEmail.email });
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartIndex = findUser.cart.findIndex((item) => item.productId.toString() === id);
        if (cartIndex !== -1) { 
            findUser.cart[cartIndex].quantity = quantity;
            findUser.cart[cartIndex].price = findProduct.price * quantity;
        } else {
            findUser.cart.push({ productId: id,productImages:findProduct.images,productName: findProduct.name, quantity: quantity,price:findProduct.price*quantity });
        }
        await findUser.save();
        return res.status(200).json({ message: "Product added to cart" });  
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

productRouter.get("/getcart",auth, async(req, res)=>{
    try{
        if (!req.user) {
            return res.status(404).json({message:"user does not exist"});
        }
        const user = await userModel.findOne({email:req.user.email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({cart:user.cart});
    }
    catch (error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


productRouter.put('/edit-product/:id', productUpload.array("files", 10), async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ID format (if using MongoDB)
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }
        
        // Find the product
        const product = await productModel.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        // Handle images
        let updatedImages = product.images; // Start with existing images
        
        if (req.files && req.files.length > 0) {
            // If new images are uploaded, replace old ones
            updatedImages = req.files.map((file) => {
                return `/product/${file.filename}`;
            });
        }
        
        // Update product properties from request body
        const { name, description, category, tags, price, stock, email } = req.body;
        
        // Only update fields that are provided
        if (name) product.name = name;
        if (description) product.description = description;
        if (category) product.category = category;
        if (tags) product.tags = tags;
        if (price) product.price = parseFloat(price);
        if (stock) product.stock = parseInt(stock, 10);
        if (email) product.email = email;
        
        product.images = updatedImages;
        product.updatedAt = new Date(); // Add timestamp if your schema supports it
        
        // Save updated product
        const updatedProduct = await product.save();
        
        res.status(200).json({ 
            message: "Product updated successfully", 
            product: updatedProduct 
        });
        
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ 
            message: "Server error while updating product", 
            error: err.message 
        });
    }
});

productRouter.delete('/delete-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the product
        const existingProduct = await productModel.findById(id);

        if (!existingProduct) {
            return res.status(404).json({ message: "Product does not exist" });
        }

        // Delete the product
        await existingProduct.deleteOne();
        
        // Return success response
        return res.status(200).json({ message: "Product deleted successfully" });
        
    } catch (err) {
        console.log('Error in delete:', err);
        return res.status(500).json({ message: "Server error while deleting product", error: err.message });
    }
});

productRouter.get('/get-product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await productModel.findById(id)
        if(!product){
            res.status(400).json({message:"Product not found"})
        }
        res.status(200).json({product:product})
    }catch(err){
        console.log(err)
    }
})

module.exports=productRouter;