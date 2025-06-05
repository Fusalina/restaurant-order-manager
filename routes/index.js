const express = require("express");
const router = express.Router();

const customerRoutes = require("./customerRoutes");
const menuRoutes = require("./menuRoutes");
const orderRoutes = require("./orderRoutes");

// API Versioning
router.use("/v1/customer", customerRoutes);
router.use("/v1/menu", menuRoutes);
router.use("/v1/order", orderRoutes);

module.exports = router;
