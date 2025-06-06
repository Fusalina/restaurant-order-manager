const MenuService = require("../menu");
const { MenuItem } = require("../../models");

jest.mock("../../models", () => ({
  MenuItem: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
  },
}));

describe("MenuService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createMenuItem", () => {
    const validData = {
      name: "Pizza",
      description: "Delicious cheese pizza",
      price: 10,
      category: "main_course",
    };

    it("should create a menu item successfully", async () => {
      MenuItem.create.mockResolvedValue({ id: 1, ...validData });

      const result = await MenuService.createMenuItem(validData);

      expect(MenuItem.create).toHaveBeenCalledWith(validData);
      expect(result).toEqual({ id: 1, ...validData });
    });

    it("should throw if required fields are missing", async () => {
      await expect(MenuService.createMenuItem({})).rejects.toThrow(
        "Name, description, price, and category are required."
      );
    });

    it("should throw if price is negative or not a number", async () => {
      await expect(
        MenuService.createMenuItem({ ...validData, price: -1 })
      ).rejects.toThrow(
        "Price must be a number greater than or equal to zero."
      );

      await expect(
        MenuService.createMenuItem({ ...validData, price: "free" })
      ).rejects.toThrow(
        "Price must be a number greater than or equal to zero."
      );
    });

    it("should throw if category is invalid", async () => {
      await expect(
        MenuService.createMenuItem({ ...validData, category: "snack" })
      ).rejects.toThrow(
        "Category must be one of: starter, main_course, dessert, drink"
      );
    });
  });

  describe("getMenuItems", () => {
    it("should return paginated menu items without category filter", async () => {
      const mockData = {
        rows: [{ id: 1, name: "Pizza" }],
        count: 1,
      };

      MenuItem.findAndCountAll.mockResolvedValue(mockData);

      const result = await MenuService.getMenuItems(undefined, 1, 10);

      expect(MenuItem.findAndCountAll).toHaveBeenCalledWith({
        where: {},
        limit: 10,
        offset: 0,
      });
      expect(result).toEqual({
        data: mockData.rows,
        pagination: {
          total: 1,
          page: 1,
          limit: 10,
          pages: 1,
        },
      });
    });

    it("should filter by category and paginate correctly", async () => {
      const mockData = {
        rows: [{ id: 2, name: "Salad", category: "starter" }],
        count: 5,
      };

      MenuItem.findAndCountAll.mockResolvedValue(mockData);

      const result = await MenuService.getMenuItems("starter", 2, 2);

      expect(MenuItem.findAndCountAll).toHaveBeenCalledWith({
        where: { category: "starter" },
        limit: 2,
        offset: 2,
      });

      expect(result).toEqual({
        data: mockData.rows,
        pagination: {
          total: 5,
          page: 2,
          limit: 2,
          pages: 3,
        },
      });
    });

    it("should throw if category is invalid", async () => {
      await expect(
        MenuService.getMenuItems("invalid_category")
      ).rejects.toThrow(
        "Category must be one of: starter, main_course, dessert, drink"
      );
    });
  });
});
