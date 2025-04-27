import Trip from "../model/trip.js";

export const createTrip = async (req, res) => {
  try {
    const {
      title,
      destination,
      description,
      startDate,
      endDate,
      pricePerPerson,
      availableSeats,
      imageUrl,
    } = req.body;
    const newTrip = new Trip({title, destination,description,startDate, endDate,pricePerPerson,availableSeats,imageUrl,});
    await newTrip.save();
    res
      .status(201)
      .json({ message: "Trip created successfully", data: newTrip });
  } catch (err) {
    res.status(500).json({ message: "Error creating trip", error: err });
  }
};

export const updateTrip = async (req, res) => {
  try {
    if (!req.userRole || req.userRole !== "ADMIN") {
        return res.status(403).json({ error: "Only admin can update trips" });
    }
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    const {title,destination,description,startDate,endDate,pricePerPerson,availableSeats,imageUrl} = req.body;
    if (title !== undefined) trip.title = title;
    if (destination !== undefined) trip.destination = destination;
    if (description !== undefined) trip.description = description;
    if (startDate !== undefined) trip.startDate = startDate;
    if (endDate !== undefined) trip.endDate = endDate;
    if (pricePerPerson !== undefined) trip.pricePerPerson = pricePerPerson;
    if (availableSeats !== undefined) trip.availableSeats = availableSeats;
    if (imageUrl !== undefined) trip.imageUrl = imageUrl;

    await trip.save();
    return res.json({ message: "Trip updated successfully", data: trip });
  } 
  catch (err) {
    res.status(500).json({ message: "Error updating trip", error: err.message });
  }
};

export const deleteTrip= async(req,res)=>{
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.json({ message: "Trip deleted successfully", data: deletedTrip });
  } catch (err) {
    return res.status(500).json({ error: "Error deleting trip", details: err.message });
  }
};

export const updateStatus = async(req,res)=>{
  try {
    const {bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error updating booking status", details: err.message });
  }
}