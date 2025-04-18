import User from "./../model/user.js";
import Blog from "./../model/blog.js";
import Booking from "./../model/booking.js";

//Create a new booking
export const createBooking = async (req, res) => {
    const{ user,hotel,room,checkin,checkout,totalAmount,status }=req.body;
    if (new Date(checkin) >= new Date(checkout)) {
        return res.status(400).json({ msg: "Check-out date must be after check-in date" });
      }
    const userExist = await User.findById(req.userId);
    if(!userExist) {
        return res.status(404).json({ msg: "User not found" });
    }
    const booking= new Booking({user: req.userId,hotel,room,checkin,checkout,totalAmount,status:"Pending"});
    await booking.save();
    userExist.bookings.push(booking._id); // ✅ push to user
    await userExist.save();

    res.json({ msg: "Booking created successfully",booking});
}

//Get Bookings by User
export const getBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.userId });
    res.json(bookings);
}

//update Booking status
export const updateBookingStatus = async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
    booking.status = status;
    await booking.save();
    res.json({ msg: "Booking status updated", booking });
}

//delete booking
export const deleteBooking = async (req, res) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ msg: "Booking deleted successfully" });
}
