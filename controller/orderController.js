import { connection } from "../config/db.js";

// Customer → Order place करतो
export const createOrder = (req, res) => {
  const { customerEmail, accessoryName, accessoryId, quantity, price, amount } =
    req.body;

  // Stock check कर
  connection.query(
    "SELECT * FROM accessory WHERE id = ?",
    [accessoryId],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      if (result.length === 0)
        return res.status(404).send("Accessory not found");

      const accessory = result[0];
      if (accessory.quantity < quantity) {
        return res
          .status(400)
          .send(`Low stock! Only ${accessory.quantity} available`);
      }

      connection.query(
        "INSERT INTO orders SET customerEmail=?, accessoryName=?, " +
          "accessoryId=?, quantity=?, price=?, amount=?, status=?",
        [
          customerEmail,
          accessoryName,
          accessoryId,
          quantity,
          price,
          amount,
          "pending",
        ],
        (error, result) => {
          if (error) return res.status(500).send(error.message);
          res.status(201).send("Order placed successfully!");
        },
      );
    },
  );
};

// Employee → सगळे pending orders बघतो
export const getAllPendingOrders = (req, res) => {
  connection.query(
    "SELECT * FROM orders WHERE status = 'pending'",
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};

// Customer → स्वतःचे orders बघतो
export const getOrdersByCustomerEmail = (req, res) => {
  connection.query(
    "SELECT * FROM orders WHERE customerEmail = ?",
    [req.params.email],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};

// Employee → Order sell करतो
export const sellOrder = (req, res) => {
  const { orderId, employeeId } = req.body;

  // Order details आण
  connection.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
    (error, order) => {
      if (error) return res.status(500).send(error.message);
      if (order.length === 0) return res.status(404).send("Order not found");

      const currentOrder = order[0];

      // Stock कमी कर
      connection.query(
        "SELECT * FROM accessory WHERE id = ?",
        [currentOrder.accessoryId],
        (error, accessory) => {
          if (error) return res.status(500).send(error.message);

          const newQuantity = accessory[0].quantity - currentOrder.quantity;
          const newStatus = newQuantity === 0 ? "N" : "Y";

          connection.query(
            "UPDATE accessory SET quantity=?, status=? WHERE id=?",
            [newQuantity, newStatus, currentOrder.accessoryId],
            (error) => {
              if (error) return res.status(500).send(error.message);

              // Invoice बनव
              connection.query(
                "INSERT INTO invoice SET orderId=?, customerEmail=?, employeeId=?, totalAmount=?",
                [
                  orderId,
                  currentOrder.customerEmail,
                  employeeId,
                  currentOrder.amount,
                ],
                (error, invoiceResult) => {
                  if (error) return res.status(500).send(error.message);

                  // Order status → sold
                  connection.query(
                    "UPDATE orders SET status='sold' WHERE id=?",
                    [orderId],
                    (error) => {
                      if (error) return res.status(500).send(error.message);

                      // Selling table मध्ये पण save कर
                      connection.query(
                        "INSERT INTO selling SET customerName=?, customerEmail=?, " +
                          "accessoryName=?, quantity=?, price=?, amount=?, employeeId=?",
                        [
                          "Online Customer",
                          currentOrder.customerEmail,
                          currentOrder.accessoryName,
                          currentOrder.quantity,
                          currentOrder.price,
                          currentOrder.amount,
                          employeeId,
                        ],
                        (error) => {
                          if (error) return res.status(500).send(error.message);
                          res.status(200).send({
                            message: "Order sold successfully!",
                            invoiceId: invoiceResult.insertId,
                          });
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

// Customer → स्वतःचे invoices बघतो
export const getInvoicesByCustomerEmail = (req, res) => {
  connection.query(
    "SELECT invoice.*, orders.accessoryName, orders.quantity, orders.price " +
      "FROM invoice " +
      "INNER JOIN orders ON invoice.orderId = orders.id " +
      "WHERE invoice.customerEmail = ?",
    [req.params.email],
    (error, result) => {
      if (error) return res.status(500).send(error.message);
      res.status(200).send(result);
    },
  );
};
