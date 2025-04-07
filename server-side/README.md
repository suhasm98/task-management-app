# 📝 Task Manager API

A simple and secure Task Manager CRUD API built with **Node.js**, **Express**, and **MongoDB**. It includes user authentication using **JWT**, password hashing with **bcrypt**, a structured project setup, and a one-step setup script.

---

## 🚀 Features

- ✅ User Signup & Login with hashed passwords (`bcrypt`)
- ✅ JWT-based authentication
- ✅ Secure RESTful CRUD operations on tasks
- ✅ Tasks are scoped to authenticated users
- ✅ Input validation using `express-validator`
- ✅ Middleware for:
  - CORS
  - Secure headers (`helmet`)
  - Rate limiting
- ✅ Auto setup script:
  - JWT secret key generation
  - MongoDB database creation
  - Dependency installation
  - Server startup (background)
  - Initial test user and task

---

## 🧰 Tech Stack

- **Node.js**
- **Express**
- **MongoDB** + Mongoose
- **JWT** (`jsonwebtoken`)
- **Bcrypt**
- **Helmet** for secure headers
- **express-rate-limit**
- **CORS**
- **express-validator**
- **mongosh** for MongoDB CLI access
- **jq** for parsing login token during setup

---

## 📦 Installation & Setup

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [`jq`](https://stedolan.github.io/jq/) – `sudo apt install jq` or `brew install jq`
- `mongosh` – MongoDB shell (comes with MongoDB installation)

---

### ▶️ Run Setup Script

Clone the project, then:

```bash
chmod +x setup.sh
./setup.sh
