import Attendance from "../models/Attendance.js";


// MARK ATTENDANCE
export const markAttendance = async (
  req,
  res
) => {
  try {
    const { student, status } = req.body;

    const attendance = await Attendance.create({
      student,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL ATTENDANCE
export const getAttendance = async (
  req,
  res
) => {
  try {
    const attendance = await Attendance.find()
      .populate("student", "name email");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE ATTENDANCE
export const updateAttendance = async (
  req,
  res
) => {
  try {
    const attendance = await Attendance.findById(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    attendance.status =
      req.body.status || attendance.status;

    await attendance.save();

    res.json({
      message: "Attendance updated",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};