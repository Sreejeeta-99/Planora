import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },               
  destination: { type: String, required: true },         
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  pricePerPerson: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  imageUrl: { type: String },                           
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trip', tripSchema);
