const app = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
