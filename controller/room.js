import Room from "../model/room.js";

//Create new room


// Get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a room by id
const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
        } 
        catch (err) {
            res.status(500).json({ message: err.message });
        }
};