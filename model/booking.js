const mongoose = require('mongoose');

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

const tripDetailsSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  destination: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  duration: { type: Number } // optional
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  tripDetails: tripDetailsSchema,
  travelerInfo: [travelerSchema],

  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },

  paymentInfo: paymentInfoSchema,
  specialRequests: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
