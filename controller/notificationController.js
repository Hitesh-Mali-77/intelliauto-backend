import { connection } from "../config/db.js";

export const createNotification = (req, res) => {
  const { managerId, managerName, accessoryName, message } = req.body;
  connection.query(
    "INSERT INTO notifications SET managerId=?, managerName=?, accessoryName=?, message=?",
    [managerId, managerName, accessoryName, message],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(201).send("Notification sent successfully!");
      }
    },
  );
};

export const getAllNotifications = (req, res) => {
  connection.query(
    "SELECT * FROM notifications ORDER BY createdAt DESC",
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};

export const markAsRead = (req, res) => {
  connection.query(
    "UPDATE notifications SET isRead = TRUE WHERE id = ?",
    [req.params.id],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send("Notification marked as read!");
    },
  );
};

export const getUnreadCount = (req, res) => {
  connection.query(
    "SELECT COUNT(*) as count FROM notifications WHERE isRead = FALSE",
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result[0]);
    },
  );
};
