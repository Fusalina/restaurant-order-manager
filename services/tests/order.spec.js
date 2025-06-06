const OrderService = require("../order");
const { Order, OrderItem, MenuItem, sequelize } = require("../../models");

jest.mock("../../models", () => ({
  Order: {
    create: jest.fn(),
  },
  MenuItem: {
    findByPk: jest.fn(),
  },
  OrderItem: {
    create: jest.fn(),
  },
  sequelize: {
    transaction: jest.fn(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
  },
}));

describe("Order Service - createOrder", () => {
  let transaction;

  beforeEach(() => {
    transaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };

    sequelize.transaction.mockResolvedValue(transaction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("it should create an order successfully", async () => {
    const customer_id = 1;
    const items = [
      { menu_item_id: 1, quantity: 2 },
      { menu_item_id: 2, quantity: 1 },
    ];

    const fakeMenuItems = {
      1: { id: 1, price: 10 },
      2: { id: 2, price: 20 },
    };

    const mockSave = jest.fn().mockResolvedValue();
    Order.create.mockResolvedValue({
      id: 1,
      total: 0,
      save: mockSave,
    });

    MenuItem.findByPk.mockImplementation(async (id) => {
      return fakeMenuItems[id] || null;
    });

    OrderItem.create.mockImplementation(async (data) => data);

    const result = await OrderService.createOrder(customer_id, items);

    expect(Order.create).toHaveBeenCalledWith(
      { customer_id, status: "pending", total: 0 },
      { transaction }
    );

    expect(MenuItem.findByPk).toHaveBeenCalledTimes(2);
    expect(OrderItem.create).toHaveBeenCalledTimes(2);
    expect(mockSave).toHaveBeenCalled();

    expect(transaction.commit).toHaveBeenCalled();
    expect(result.order).toBeDefined();
    expect(result.orderItems.length).toBe(2);
  });

  test("it should throw error if items array is empty", async () => {
    const customer_id = 1;
    const items = [];

    await expect(OrderService.createOrder(customer_id, items)).rejects.toThrow(
      "Items array cannot be empty"
    );

    expect(transaction.rollback).not.toHaveBeenCalled();
  });

  test("it should throw error if menu item does not exist", async () => {
    const customer_id = 1;
    const items = [{ menu_item_id: 999, quantity: 1 }];

    Order.create.mockResolvedValue({ id: 1, total: 0, save: jest.fn() });
    MenuItem.findByPk.mockResolvedValue(null);

    await expect(OrderService.createOrder(customer_id, items)).rejects.toThrow(
      "Menu item 999 not found"
    );

    expect(transaction.rollback).toHaveBeenCalled();
  });

  test("it should throw error if quantity is invalid", async () => {
    const customer_id = 1;
    const items = [{ menu_item_id: 1, quantity: 0 }];

    Order.create.mockResolvedValue({ id: 1, total: 0, save: jest.fn() });
    MenuItem.findByPk.mockResolvedValue({ id: 1, price: 10 });

    await expect(OrderService.createOrder(customer_id, items)).rejects.toThrow(
      "Quantity for item 1 must be greater than 0"
    );

    expect(transaction.rollback).toHaveBeenCalled();
  });
});
