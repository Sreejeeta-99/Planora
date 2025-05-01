import Product from "../model/product.js";

//only admin
export const createProduct = async (req, res) => {
    try{
        const newProduct = new Product({...req.body});
        await newProduct.save();
        
    return res.status(201).json({ message: "Product created successfully", data: newProduct });
    }
   catch(err){
    return res.status(500).json({ message: "Error creating product", error: err.message });
   }
};

export const updateProduct = async(req,res)=>{
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId,{ $set:req.body },{ new: true, runValidators: true });
        if(!updateProduct)
        {
            return res.status(404).json({message: "Product not found"})
        }
        return res.status(200).json({ message: "Product updated successfully",data: updatedProduct});

    } catch (error) {
        return res.status(500).json({ message: "Error updating product", error: error.message });
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!productId){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({ message: "Product deleted successfully",data: deletedProduct});
    } catch (error) {
        return res.status(500).json({message: "Error deleting product",error: error.message});
    }
}

//customers...without login
export const getAllProducts = async(req,res)=>{
    try {
        const product = await Product.find();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({message: "Error fetching products",error: error.message});
    }
}

export const getProductById = async(req,res)=>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json({ message: "Product fetched successfully",data: product});
    } catch (error) {
        return res.status(500).json({message: "Error fetching product",error: error.message});
    }
}

export const filterProducts = async(req,res)=>{
    try {
        const {name, price, seasonal_type, size}= req.query;
        const filter = {};
        if(name) filter.name = { $regex: name, $options: "i" };// case insensitive
        if(price) filter.price = {$lte:Number(price)};//price ≤ given price
        if (seasonal_type) filter.seasonal_type = seasonal_type;
        if (size) filter.size = size;

        const bookings = await Product.find(filter);
        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found matching the filters" });
        }
        return res.status(200).json({ message: "Filtered bookings fetched", data: bookings });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching filtered bookings", error: error.message });
    }
}