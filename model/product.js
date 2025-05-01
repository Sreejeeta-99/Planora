import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true},
    seasonal_type:{
        type:String,
        enum:[ 'Winter Essentials',
            'Summer Essentials',
            'Monsoon Gear',
            'Camping Gear',
            'Desert Travel',
            'Trekking Equipment',
            'Beach Accessories',
            'Hiking Gear',
            'Mountain Gear'],
        required:true
    },
    sizes: [String],
    brand: { type: String },
    materials: [String],
    availability: { type: Boolean, default: true },
    rating: { type: Number, default: 0 }},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);
