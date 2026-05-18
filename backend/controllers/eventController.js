import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (
  req,
  res
) => {
  try {
    const { title, description } =
      req.body;

    const image = req.file.filename;

    const event = await Event.create({
      title,
      description,
      image,
    });
  res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET EVENTS
export const getEvents = async (
  req,
  res
) => {
  try {
    const events = await Event.find();
     res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};