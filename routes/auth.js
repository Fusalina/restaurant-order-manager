const express = require("express");
const jwt = require("jsonwebtoken");
const { Customer } = require("../models");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  const user = await Customer.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
