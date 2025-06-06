const MenuService = require("../services/menu");

module.exports = {
  async createMenuItem(req, res) {
    try {
      const menuItem = await MenuService.createMenuItem(req.body);
      res.status(201).json(menuItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getMenuItems(req, res) {
    try {
      const { category, page = 1, limit = 10 } = req.query;
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const result = await MenuService.getMenuItems(
        category,
        pageNum,
        limitNum
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
