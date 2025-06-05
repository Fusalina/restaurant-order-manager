const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu");

router.post("/", menuController.createMenuItem);
router.get("/", menuController.getMenuItems);

module.exports = router;
