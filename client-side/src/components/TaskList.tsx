import { useSelector, useDispatch } from "react-redux"
import { setFilter, Task } from "@/features/tasks/taskSlice"
import { RootState } from "@/app/store"
import TaskItem from "./TaskItem"

const TaskList = ({ fetchTasks }: { fetchTasks: () => void }) => {
  const dispatch = useDispatch()
  const { tasks, filter } = useSelector((state: RootState) => state.tasks)

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "todo") return task.status === "todo"
    if (filter === "completed") return task.status === "completed"
    if (filter === "inprogress") return task.status === "inprogress"
    return true
  })

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 mt-6">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-[#FC9858] text-white" : "bg-gray-200 text-slate-400"}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("todo"))}
          className={`px-4 py-2 rounded ${filter === "todo" ? "bg-blue-600 text-white" : "bg-gray-200 text-slate-400"}`}
        >
          Todo
        </button>
        <button
          onClick={() => dispatch(setFilter("inprogress"))}
          className={`px-4 py-2 rounded ${filter === "inprogress" ? "bg-green-600 text-white" : "bg-gray-200 text-slate-400"}`}
        >
          Inprogress
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-[#FF614C] text-white" : "bg-gray-200 text-slate-400"}`}
        >
          Completed
        </button>
      </div>
      <div className="h-[60vh] overflow-auto">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: Task) => (
            <TaskItem key={task._id} task={task} refresh={fetchTasks} />
          ))
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  )
}

export default TaskList
