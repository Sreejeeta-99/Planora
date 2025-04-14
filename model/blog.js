import mongoose from "mongoose";
import { Schema } from "mongoose";
const { ObjectId } = Schema;

const commentSchema = new Schema({
  author: { type: ObjectId, ref: "User" },
  comment: { type: String, required: true },
},
{ timestamps: true });

const blogSchema = new Schema(
  {
    author: { type: ObjectId, ref: "User", required:true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: {
      url: String,
      public_Id: String
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  { timestamps: true }
);
export default mongoose.model("Blog", blogSchema);
