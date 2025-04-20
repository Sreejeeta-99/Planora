import mongoose from "mongoose";
import { Schema } from "mongoose";

const travelerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String },
  passportNumber: { type: String },
  nationality: { type: String }
}, { _id: false });

const paymentInfoSchema = new mongoose.Schema({
  paymentId: { type: String },
  amount: { type: Number },
  currency: { type: String, default: 'USD' },
  paymentStatus: { type: String, enum: ['paid', 'failed', 'refunded'], default: 'paid' },
  paymentDate: { type: Date }
}, { _id: false });


const bookingSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User', required: true },
  
  trip: { type: ObjectId, ref: 'Trip', required: true },
  travelerInfo: [travelerSchema],

  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },

  paymentInfo: paymentInfoSchema,
},{timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
