const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.createCustomer);
router.get("/orders/:customer_id", customerController.getCustomerOrders);

module.exports = router;
