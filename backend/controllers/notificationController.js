import Notification from "../models/Notification.js";


// CREATE NOTIFICATION
export const createNotification =
  async (req, res) => {
    try {
      const { title, message } = req.body;

      const notification =
        await Notification.create({
          title,
          message,
        });

      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET NOTIFICATIONS
export const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find();

      res.json(notifications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// DELETE NOTIFICATION
export const deleteNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.findById(
          req.params.id
        );

      if (!notification) {
        return res.status(404).json({
          message: "Notification not found",
        });
      }

      await notification.deleteOne();

      res.json({
        message: "Notification deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };