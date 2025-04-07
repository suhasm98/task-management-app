import { useSelector, useDispatch } from "react-redux";
import { setFilter, Task } from "@/features/tasks/taskSlice";
import { RootState } from "@/app/store";
import TaskItem from "./TaskItem";

const TaskList = ({ fetchTasks }: { fetchTasks: () => void }) => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-slate-400"}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-slate-400"}`}
        >
          Completed
        </button>
        <button
          onClick={() => dispatch(setFilter("pending"))}
          className={`px-4 py-2 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-slate-400"}`}
        >
          Pending
        </button>
      </div>

      {/* Render Tasks */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task: Task) => <TaskItem key={task._id} task={task} refresh={fetchTasks} />)
      ) : (
        <p className="text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
