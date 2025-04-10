import mongoose from "mongoose";
import { Schema } from "mongoose";
const {ObjectId} = Schema;


const userSchema= new Schema(
    {
        name: {type:String,required:true,trim:true},
        email: {type:String,required:true,trim:true,unique:true},
        password: {type:String,required:true,trim:true},
        image: {
            url: String,
            public_id: String
        },
        role:{
            type:[String],
            default: ['USER'],
            enum: ['USER', 'ADMIN', 'SELLER', 'GUIDE'],
        },
        blogs:[
            {
                type: ObjectId,
                ref: 'Blog'
            }
        ],//one to many --> array format
        bookings:[
            {
                type: ObjectId,
                ref:'Booking'
            }
        ]
    },
    {timestamps:true}
)
export default mongoose.model('User',userSchema);