const express = require("express");
const router = express.Router();

const authenticateToken = require("../middlewares/authenticateToken");

const customerRoutes = require("./customer");
const menuRoutes = require("./menu");
const orderRoutes = require("./order");
const authRoutes = require("./auth");

router.use("/v1/auth", authRoutes);

router.use(authenticateToken);
router.use("/v1/customer", customerRoutes);
router.use("/v1/menu", menuRoutes);
router.use("/v1/order", orderRoutes);

module.exports = router;
