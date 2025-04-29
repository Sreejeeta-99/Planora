import Trip from "../model/trip.js";
import Booking from "../model/booking.js";
import User from "../model/user.js";

export const createBooking = async (req, res) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized, please login first" });
    }
    const { tripId, travelerInfo, paymentInfo } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    const newBooking = new Booking({
      userId: req.userId,
      trip: tripId,
      travelerInfo,
      paymentInfo,
      bookingStatus: "pending",
    });
    await newBooking.save();

    const user = await User.findById(req.userId);
    user.bookings.push(newBooking._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", data: newBooking });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating booking", details: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ bookings: user.bookings });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching bookings", details: err.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ booking });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching booking", details: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { bookings: booking._id },
    });

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", data: booking });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error cancelling booking", details: err.message });
  }
};
