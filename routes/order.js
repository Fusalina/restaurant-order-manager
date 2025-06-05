const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/", orderController.createOrder);
router.patch("/:order_id", orderController.updateOrderStatus);
router.patch("/modify/:order_id", orderController.modifyOrder);

module.exports = router;
