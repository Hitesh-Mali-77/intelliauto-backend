import { connection } from "../config/db.js";

export const getAllCategory = (req, res) => {
  connection.query("SELECT * FROM category", (error, result) => {
    if (error) return res.status(500).send(error.message);
    res.status(200).send(result);
  });
};

export const getCurrentCategoryById = (req, res) => {
  connection.query(
    "SELECT * FROM category WHERE id = ?",
    req.params.id,
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result[0]);
    },
  );
};

export const deleteCategoryById = (req, res) => {
  connection.query(
    "DELETE FROM category WHERE id = ?",
    req.params.id,
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(200).send("category deleted successfully");
      }
    },
  );
};

export const createCategory = (req, res) => {
  const { id, name } = req.body;
  connection.query(
    "INSERT INTO category SET name = ?",
    [name],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(201).send("Category Created Successfully");
      }
    },
  );
};

export const updateCategory = (req, res) => {
  const { id, name } = req.body;
  connection.query(
    "UPDATE category SET name = ? WHERE id = ?",
    [name, id],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.affectedRows === 1) {
        res.status(200).send("Category Update Successfully");
      }
    },
  );
};
