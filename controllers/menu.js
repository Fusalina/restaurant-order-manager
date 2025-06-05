const { MenuItem } = require("../models");

module.exports = {
  async createMenuItem(req, res) {
    try {
      const { name, description, price, category } = req.body;

      const menuItem = await MenuItem.create({
        name,
        description,
        price,
        category,
      });

      res.status(201).json(menuItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getMenuItems(req, res) {
    try {
      const { category } = req.query;

      const where = category ? { category } : {};

      const menuItems = await MenuItem.findAll({ where });

      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
