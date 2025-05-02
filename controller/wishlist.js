import Wishlist from "../model/wishlist.js";
import Product from "../model/product.js";
import wishlist from "../model/wishlist.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      //const newWishlist = new Wishlist({ ...req.body });
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
      await wishlist.save();
    } else 
    {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      } 
      else
        return res.status(400).json({ message: "Product already in wishlist." });
    }
    return res
      .status(200)
      .json({ message: "Product added to wishlist.", data: wishlist });
  } catch (error) {
    return res.status(500).json({ message: "Error adding to wishlist.", error: error.message });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const wishlist = await Wishlist.findOne({user: userId});
    if(!wishlist){
        return res.status(404).json({message:"Wishlist not found"});
    }
    return res.status(200).json({ message: "Wishlist retrieved successfully.", data: wishlist });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving wishlist.", error: error.message });
  }
};


export const removeFromWishlist = async(req,res)=>{
    try{
        const {productId} = req.body;
        const userId = req.userId;

        const wishlist = await Wishlist.findOne({user: userId});
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        if(!wishlist.products.includes(productId)){
            return res.status(400).json({ message: "Product not found in wishlist" });
        }

        wishlist.products.pull(productId);
        await wishlist.save();
        return res.status(200).json({ message: "Product removed from wishlist", data: wishlist });
        
        /*
        const updatedWishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: {products: productId} },
            { new:true }
        );
        if(!updatedWishlist){
            return res.status(404).json({ message: "Wishlist not found."});
        }
        return res.status(200).json({message:"Product removed from the wishlist.", data:updatedWishlist});
    */
        }
    catch(error)
    {
        return res.status(500).json({ message: "Error removing product.", error: error.message });
    }
}