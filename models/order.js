"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "preparing",
          "ready",
          "delivered",
          "canceled"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
      timestamps: true,
    }
  );

  return Order;
};
