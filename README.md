# 📋 Task Management App

A full-stack Task Management application built with a **React (Vite)** frontend and a **Node.js + Express + MongoDB** backend. This app allows users to securely sign up, log in, and manage their personal tasks via a modern and responsive interface.

---

## 🧩 Project Structure

```
task-management-app/
├── client-side/     # Frontend - React + Vite
└── server-side/     # Backend - Node.js + Express + MongoDB
```

---

## ⚙️ Features

- 🔐 Secure authentication using **JWT** and **bcrypt**
- 🧾 Fully functional **CRUD** for task management
- 🌐 **RESTful API** integrated with the frontend
- 🎨 Styled using **Tailwind CSS**
- 🧠 State management using **Redux Toolkit**
- 🛡️ Secure backend with CORS, Helmet, and Rate Limiting
- 📦 One-step backend setup script (`setup.sh`)
- 🧪 Unit and integration tests with **Jest** and **Supertest**

---

## 🚀 Tech Stack

### 🔧 Backend (`server-side/`)
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- Bcrypt for password hashing
- Helmet, CORS, Rate Limiting
- express-validator
- CLI tools: jq, mongosh

### 🎨 Frontend (`client-side/`)
- React (Vite)
- Redux Toolkit
- Axios
- Tailwind CSS
- react-toastify

---

## 📂 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2️⃣ Backend Setup

```bash
cd server-side
chmod +x setup.sh
./setup.sh
```

> 🔐 The script installs dependencies, creates environment variables, sets up MongoDB, and runs the dev server.

### 3️⃣ Frontend Setup

In a new terminal:

```bash
cd client-side
npm install
npm run dev
```

> 🌐 This will start the React development server on `http://localhost:5173` (or the default Vite port).

---

## 📁 More Info

- [🔧 Backend README](./sever-side/README.md)
- [🎨 Frontend README](./client-side/README.md)

---

## ✍️ Author

Made with ❤️ by [Suhas]

