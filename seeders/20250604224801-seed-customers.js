module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Customers",
      [
        {
          name: "Rita Von Hunty",
          email: "rita@mgmail.com",
          phone: "99123-1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vanessa Supersauro",
          email: "van@mail.com",
          phone: "99321-5678",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
