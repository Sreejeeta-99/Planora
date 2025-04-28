import Trip from "../model/trip.js";

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find(); // fetch all trips
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

export const getTripByID = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip); // Send the trip details as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip", error });
  }
};

export const filterTrips = async (req, res) => {
  try {
    const { destination, price, startDate, endDate } = req.query;
    console.log("Filter trips request received:", req.query);
    const filter = {};

    if (destination) filter.destination = destination;
    if (price) filter.pricePerPerson = { $lte: price };
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (endDate) filter.endDate = { $lte: new Date(endDate) };

    const trips = await Trip.find(filter);
    if (trips.length === 0) {
      return res
        .status(404)
        .json({ message: "No trips found matching the filters" });
    }

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filtered trips", error });
  }
};
