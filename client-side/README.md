
## 📋 Task Manager Frontend (React + Vite + TS)

A full-featured task manager frontend built with:

- ⚛️ **React + Vite + TypeScript**
- 🧠 **Redux Toolkit** for state management
- 🎨 **Tailwind CSS** for styling
- 📦 **Axios** for API requests
- 🔐 **JWT Authentication** (via httpOnly cookies or `localStorage`)
- 🧪 **React Toastify** for error/success messages

---

### 🔗 Backend API

Make sure your backend (Node.js + Express + MongoDB) is running and supports:

```
POST   /signup         # Register
POST   /login          # Login & get JWT
GET    /tasks          # Fetch all tasks
POST   /tasks          # Create new task
PUT    /tasks/:id      # Update task status
DELETE /tasks/:id      # Delete a task
```

---

### 📁 Folder Structure

```
src/
│
├── app/                # Redux store setup
│   └── store.ts
├── features/           # Redux slices
│   └── tasks/taskSlice.ts
│   └── auth/authSlice.ts
├── components/         # Reusable UI components
│   └── TaskItem.tsx
│   └── TaskList.tsx
│   └── Navbar.tsx
├── pages/              # Pages (Routes)
│   └── Home.tsx
│   └── Login.tsx
│   └── Signup.tsx
│   └── Dashboard.tsx
├── api/                # Axios instance
│   └── axios.ts
├── routes/             # React Router setup
│   └── PrivateRoute.tsx
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

---

### ⚙️ Getting Started

#### 1. Clone the repo

```bash
git clone https://github.com/suhasm98/task-management-app.git
cd task-manager-frontend
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create environment variable

Create a `.env` file in the root:

```
VITE_API_URL=http://localhost:3000/api
```

Replace with your deployed backend URL in production.

#### 4. Run the app

```bash
npm run dev
```

---

### ✨ Features

- ✅ Signup & Login with JWT
- 🔐 Protected Dashboard route
- ✅ Create, Read, Update, Delete tasks
- 📊 Filter tasks by **All**, **Completed**, or **Pending**
- 🔄 Token handling via `localStorage`
- 🌈 Toast messages for feedback
- 🌐 Axios API integration

---

### 🛠 Tech Stack

- Vite + React + TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Toastify
- React Router v6

---

### 🙌 Author

Made with ❤️ by [Suhas](https://github.com/suhasm98)

