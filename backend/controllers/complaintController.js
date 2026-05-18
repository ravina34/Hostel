import Complaint from "../models/Complaint.js";


// ADD COMPLAINT
export const addComplaint = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      priority,
    } = req.body;

    const complaint = await Complaint.create({
      student: req.user.id,
      title,
      description,
      priority,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL COMPLAINTS
export const getComplaints = async (
  req,
  res
) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE COMPLAINT STATUS
export const updateComplaintStatus =
  async (req, res) => {
    try {
      const complaint =
        await Complaint.findById(
          req.params.id
        );

      if (!complaint) {
        return res.status(404).json({
          message: "Complaint not found",
        });
      }

      complaint.status =
        req.body.status || complaint.status;

      await complaint.save();

      res.json({
        message: "Complaint updated",
        complaint,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };