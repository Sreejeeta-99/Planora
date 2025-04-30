import Product from "../model/product.js";

//only admin
export const createProduct = async (req, res) => {
    try{
        const newProduct = new Product({...req.body});
        await newProduct.save();
        
    res.status(201).json({ message: "Product created successfully", data: newProduct });
    }
   catch(err){
    res.status(500).json({ message: "Error creating product", error: err.message });
   }
};
