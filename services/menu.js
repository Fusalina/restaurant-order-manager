const { MenuItem } = require("../models");

const VALID_CATEGORIES = ["starter", "main_course", "dessert", "drink"];

class MenuService {
  static async createMenuItem(data) {
    const { name, description, price, category } = data;

    if (!name || !description || price === undefined || !category) {
      throw new Error("Name, description, price, and category are required.");
    }

    if (typeof price !== "number" || price < 0) {
      throw new Error("Price must be a number greater than or equal to zero.");
    }

    if (!VALID_CATEGORIES.includes(category)) {
      throw new Error(
        `Category must be one of: ${VALID_CATEGORIES.join(", ")}`
      );
    }

    return await MenuItem.create({ name, description, price, category });
  }

  static async getMenuItems(category, page = 1, limit = 10) {
    if (category && !VALID_CATEGORIES.includes(category)) {
      throw new Error(
        `Category must be one of: ${VALID_CATEGORIES.join(", ")}`
      );
    }

    const where = category ? { category } : {};
    const offset = (page - 1) * limit;

    const { rows, count } = await MenuItem.findAndCountAll({
      where,
      limit,
      offset,
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  }
}

module.exports = MenuService;
