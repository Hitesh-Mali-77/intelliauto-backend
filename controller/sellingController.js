import { connection } from "../config/db.js";

export const getAllSelling = (req, res) => {
  connection.query(
    "SELECT selling.*, user.emailId FROM selling " +
      "INNER JOIN user ON selling.employeeId = user.id",
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};

export const createSelling = (req, res) => {
  const {
    customerName,
    customerEmail,
    customerContact,
    customerAddress,
    accessoryName,
    quantity,
    price,
    amount,
    employeeId,
  } = req.body;

  connection.query(
    "SELECT * FROM user WHERE emailId = ? AND role = ?",
    [customerEmail, "customer"],
    (error, customerResult) => {
      if (error) return res.status(500).send(error.message);
      if (customerResult.length === 0) {
        return res
          .status(404)
          .send("This customer is not in the DB! Register the customer first.");
      }

      connection.query(
        "SELECT * FROM accessory WHERE name = ?",
        [accessoryName],
        (error, accessoryResult) => {
          if (error) return res.status(500).send(error.message);
          if (accessoryResult.length === 0)
            return res.status(404).send("Accessory Not Found");

          const accessory = accessoryResult[0];
          if (accessory.quantity < quantity) {
            return res
              .status(400)
              .send(`Low stock! Only ${accessory.quantity} available.`);
          }

          // Step 3 — Selling record save कर
          connection.query(
            "INSERT INTO selling SET customerName=?, customerEmail=?, " +
              "customerContact=?, customerAddress=?, accessoryName=?, " +
              "quantity=?, price=?, amount=?, employeeId=?",
            [
              customerName,
              customerEmail,
              customerContact,
              customerAddress,
              accessoryName,
              quantity,
              price,
              amount,
              employeeId,
            ],
            (error, sellingResult) => {
              if (error) return res.status(500).send(error.message);

              // Step 4 — Order table मध्ये save कर
              connection.query(
                "INSERT INTO orders SET customerEmail=?, accessoryName=?, " +
                  "accessoryId=?, quantity=?, price=?, amount=?, status=?",
                [
                  customerEmail,
                  accessoryName,
                  accessory.id,
                  quantity,
                  price,
                  amount,
                  "sold",
                ],
                (error, orderResult) => {
                  if (error) return res.status(500).send(error.message);

                  // Step 5 — Invoice generate कर
                  connection.query(
                    "INSERT INTO invoice SET orderId=?, customerEmail=?, employeeId=?, totalAmount=?",
                    [orderResult.insertId, customerEmail, employeeId, amount],
                    (error) => {
                      if (error) return res.status(500).send(error.message);

                      // Step 6 — Stock कमी कर
                      const newQuantity = Math.max(
                        0,
                        accessory.quantity - quantity,
                      );

                      // STEP 7 — Smart Stock Prediction Logic

                      const averageSale = quantity;

                      const predictedDays =
                        averageSale > 0
                          ? Math.round(newQuantity / averageSale)
                          : newQuantity;

                      let stockStatus = "Safe";

                      if (predictedDays <= 5) {
                        stockStatus = "Urgent";
                      } else if (predictedDays <= 15) {
                        stockStatus = "Warning";
                      }

                      // old prediction delete
                      connection.query(
                        "DELETE FROM stock_prediction WHERE accessoryId = ?",
                        [accessory.id],
                        (error) => {
                          if (error) console.log(error);

                          // new prediction insert
                          connection.query(
                            "INSERT INTO stock_prediction(accessoryId, averageSale, predictedDays, status) VALUES (?, ?, ?, ?)",
                            [
                              accessory.id,
                              averageSale,
                              predictedDays,
                              stockStatus,
                            ],
                            (error) => {
                              if (error) console.log(error);
                            },
                          );
                        },
                      );

                      const newStatus = newQuantity === 0 ? "N" : "Y";
                      connection.query(
                        "UPDATE accessory SET quantity=?, status=? WHERE name=?",
                        [newQuantity, newStatus, accessoryName],
                        (error) => {
                          if (error) return res.status(500).send(error.message);
                          res
                            .status(201)
                            .send(
                              "Selling Successfully Done! Invoice is ready",
                            );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
};
export const getSellingByEmployeeId = (req, res) => {
  connection.query(
    "SELECT * FROM selling WHERE employeeId = ?",
    req.params.id,
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};

export const getStockPrediction = (req, res) => {
  connection.query(
    "SELECT stock_prediction.*, accessory.name FROM stock_prediction " +
      "INNER JOIN accessory ON stock_prediction.accessoryId = accessory.id",
    (error, result) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      res.status(200).send(result);
    },
  );
};

export const deleteStockPrediction = (req, res) => {
  connection.query(
    "DELETE FROM stock_prediction WHERE id = ?",
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      res.status(200).send("Prediction Deleted");
    },
  );
};
