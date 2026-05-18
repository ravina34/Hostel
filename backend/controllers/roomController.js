import Room from "../models/Room.js";


// ADD ROOM
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, totalBeds } = req.body;

    const roomExists = await Room.findOne({
      roomNumber,
    });

    if (roomExists) {
      return res.status(400).json({
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomNumber,
      totalBeds,
      availableBeds: totalBeds,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET AVAILABLE ROOMS
export const getAvailableRooms = async (
  req,
  res
) => {
  try {
    const rooms = await Room.find({
      isAvailable: true,
      availableBeds: { $gt: 0 },
    });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};