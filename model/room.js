import mongoose from "mongoose";
import { Schema } from "mongoose";

const roomSchema = new Schema({
  roomNumber: { type: Number, required: true, unique: true },
  roomType: { type: String, required: true },
  roomCapacity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  roomStatus: {
    type: String,
    required: true,
    enum: ["Available", "Booked", "Under Maintenance", "Reserved"],
  },
},
    {timestamps: true}
);

export default mongoose.model("Room",roomSchema);