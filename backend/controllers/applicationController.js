import Application from "../models/Application.js";


// STUDENT APPLY
export const applyLeave = async (
  req,
  res
) => {
  try {
    const {
      reasonType,
      reason,
      fromDate,
      toDate,
    } = req.body;

    const application =
      await Application.create({
        student: req.user.id,
        reasonType,
        reason,
        fromDate,
        toDate,
      });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADMIN VIEW APPLICATIONS
export const getApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find()
          .populate(
            "student",
            "name email branch year"
          );

      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// APPROVE / REJECT
export const updateApplicationStatus =
  async (req, res) => {
    try {
      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      application.status =
        req.body.status || application.status;

      await application.save();

      res.json({
        message: "Application updated",
        application,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getMyApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          student: req.user.id,
        });

      res.status(200).json(
        applications
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };