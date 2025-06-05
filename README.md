# 📄 Restaurant Order Manager

## 🚀 Description

A restaurant order management API that handles customer registration, menu management, and order processing using Node.js, PostgreSQL, and Sequelize.

---

## 🏗️ Tech Stack

- Node.js (LTS)
- Express.js (Web Framework)
- PostgreSQL (Database)
- Sequelize (ORM)
- Jest (Testing)
- DBeaver (Optional GUI for PostgreSQL)

---

## 🔧 Installation

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_db
```

---

## 🗄️ Database Setup

### Create the database

```bash
npx sequelize-cli db:create
```

### Run migrations

```bash
npx sequelize-cli db:migrate
```

### (Optional) Seed initial data

```bash
npx sequelize-cli db:seed:all
```

---

## 🏃 Running the App

```bash
npm run dev
```

The server will start at:

```
http://localhost:3000
```

---

## 🎯 API Endpoints

### ✅ Customer

- `POST /customer` → Create customer
- `GET /customer/orders/:customer_id` → List customer orders

### ✅ Menu

- `POST /menu` → Add menu item
- `GET /menu` → List menu items (supports category filter)

### ✅ Orders

- `POST /order` → Create order
- `PATCH /order/:order_id` → Update order status
- `PATCH /order/modify/:order_id` → Modify an order

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🚑 Common Issues

| Issue                                          | Solution                                                             |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| ERROR: database "restaurant_db" already exists | The database is already created — connect instead of creating again. |
| Database doesn't show in DBeaver               | Right-click the connection → **Refresh**.                            |
| Sequelize errors about dotenv                  | Run `npm install dotenv` to install dotenv.                          |
| Connection refused                             | Verify PostgreSQL is running, and host/port are correct.             |

---

## 🙌 Contributing

Pull requests are welcome. Open issues for bugs or improvements.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📫 Contact

For questions or support:  
[zanotto.carol@gmail.com](mailto:zanotto.carol@gmail.com)
