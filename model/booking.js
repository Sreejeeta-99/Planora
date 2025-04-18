import mongoose from "mongoose";
import { Schema } from "mongoose";
const { ObjectId } = Schema;

const bookingSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User",required:true },
    hotel: { type: String, required: true },
    room: { type: ObjectId, ref: "Room" },
    checkin: { type: Date },
    checkout: { type: Date },
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Confirmed", "Cancelled"], 
        default: "Pending" 
    }, 
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
