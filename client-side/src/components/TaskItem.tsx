import { Task } from "../features/tasks/taskSlice";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function TaskItem({
  task,
  refresh,
}: {
  task: Task;
  refresh: () => void;
}) {
  const toggleComplete = async () => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
      title: task.title,
    });
    refresh();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    toast.success("Deleted!");
    refresh();
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
      <div className="flex gap-2">
        <button onClick={toggleComplete} className="text-sm text-blue-400">
          Toggle
        </button>
        <button onClick={deleteTask} className="text-sm text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}
