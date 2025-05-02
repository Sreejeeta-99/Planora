import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema;

const wishlistSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    products: [{ type: ObjectId, ref: "Product" }]
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
