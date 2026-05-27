import { connection } from "../config/db.js";

export const getAllUser = (req, res) => {
  connection.query("SELECT * FROM USER", (error, result) => {
    res.status(200).send(result);
  });
};

export const getCurrentUserById = (req, res) => {
  connection.query(
    "SELECT * FROM USER WHERE ID = ?",
    req.params.id,
    (error, result) => {
      res.status(200).send(result[0]);
    },
  );
};

export const deletUserById = (req, res) => {
  connection.query(
    "DELETE FROM user WHERE ID = ?",
    req.params.id,
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(200).send("User deleted successfully");
      }
    },
  );
};

export const createUser = (req, res) => {
  const { firstName, lastName, role, emailId, password, isFirstLogin } =
    req.body;
  connection.query(
    "INSERT INTO user SET firstName=?, lastName=?, role=?, emailId=?, password=?, isFirstLogin=?",
    [firstName, lastName, role, emailId, password, isFirstLogin ?? true],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(201).send("User Created successfully..!");
      }
    },
  );
};

export const updateUser = (req, res) => {
  const { id, firstName, lastName, role, emailId, password } = req.body;
  connection.query(
    "UPDATE USER SET FIRSTNAME=?, LASTNAME=?, ROLE=?," +
      "EMAILID=?, PASSWORD=? WHERE ID=?",
    [firstName, lastName, role, emailId, password, id],
    (error, result) => {
      if (result.affectedRows === 1) {
        res.status(200).send("User Updated Successfully..!");
      }
    },
  );
};

export const checkLoginUser = (req, res) => {
  const { emailId, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE emailId = ? AND password = ?",
    [emailId, password],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.length === 0) {
        res.status(404).send("Invalid User");
      } else {
        res.status(200).send(result[0]);
      }
    },
  );
};

export const changePassword = (req, res) => {
  const { id, newPassword } = req.body;
  connection.query(
    "UPDATE user SET password = ?, isFirstLogin = FALSE WHERE id = ?",
    [newPassword, id],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(200).send("Password Changed Successfully!");
      }
    },
  );
};

export const searchCustomers = (req, res) => {
  const search = req.params.search;
  connection.query(
    "SELECT firstName, lastName, emailId FROM user WHERE role = 'customer' AND (firstName LIKE ? OR emailId LIKE ?)",
    [`${search}%`, `${search}%`],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};
