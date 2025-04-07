import { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
} from "../features/tasks/taskSlice";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      dispatch(fetchTasksStart());
      const res = await api.get("/tasks");
      dispatch(fetchTasksSuccess(res.data));
    } catch (err) {
      dispatch(fetchTasksFailure("Failed to load tasks"));
    }
  };

  const addTask = async () => {
    try {
      await api.post("/tasks", { title });
      toast.success("Task added");
      setTitle("");
      fetchTasks();
    } catch {
      toast.error("Error adding task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">My Tasks</h2>
        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block input w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            placeholder="Task title"
          />
          <button
            onClick={addTask}
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
        <TaskList fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}
