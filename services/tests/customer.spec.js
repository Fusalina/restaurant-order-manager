const CustomerService = require("../customer");
const { Customer, Order } = require("../../models");

jest.mock("../../models", () => ({
  Customer: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Order: { findAll: jest.fn() },
  OrderItem: {},
  MenuItem: {},
}));

describe("Customer Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCustomer", () => {
    it("it should create a customer successfully", async () => {
      const data = {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      };

      Customer.findOne.mockResolvedValue(null);
      Customer.create.mockResolvedValue({ id: 1, ...data });

      const result = await CustomerService.createCustomer(data);

      expect(Customer.create).toHaveBeenCalledWith(data);
      expect(result).toEqual({ id: 1, ...data });
    });

    it("it should throw an error if required fields are missing", async () => {
      await expect(CustomerService.createCustomer({})).rejects.toThrow(
        "Name, email, and phone are required."
      );

      expect(Customer.findOne).not.toHaveBeenCalled();
      expect(Customer.create).not.toHaveBeenCalled();
    });
  });

  describe("getCustomerOrders", () => {
    it("it should fetch customer orders with items", async () => {
      const mockOrders = [
        {
          id: 1,
          customer_id: 1,
          items: [
            {
              id: 1,
              menuItem: { id: 1, name: "Pizza", price: 10 },
            },
          ],
        },
      ];

      Order.findAll.mockResolvedValue(mockOrders);

      const result = await CustomerService.getCustomerOrders(1);

      expect(Order.findAll).toHaveBeenCalledWith({
        where: { customer_id: 1 },
        include: [
          {
            model: expect.any(Object),
            as: "items",
            include: [{ model: expect.any(Object), as: "menuItem" }],
          },
        ],
      });

      expect(result).toEqual(mockOrders);
    });
  });
});
