import Trip from "../model/trip.js";

export const getAllTrips = async (req, res) => {
    try {
      const trips = await Trip.find(); // fetch all trips
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: "Error fetching trips", error });
    }
  };
  