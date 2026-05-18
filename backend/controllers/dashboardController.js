import Student from "../models/Student.js";

import Room from "../models/Room.js";

import Complaint from "../models/Complaint.js";

import Application from "../models/Application.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const students =
        await Student.countDocuments();

      const rooms =
        await Room.countDocuments();

      const complaints =
        await Complaint.countDocuments();

      const applications =
        await Application.countDocuments();

      res.status(200).json({
        students,
        rooms,
        complaints,
        applications,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };