import { Task } from "../features/tasks/taskSlice"
import api from "../api/axios"
import { toast } from "react-toastify"
import { PlayIcon, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const TaskStatus = {
  todo: "Start",
  inprogress: "Move to Completed",
  completed: "Move to Inprogress",
}

export default function TaskItem({
  task,
  refresh,
}: {
  task: Task
  refresh: () => void
}) {
  const toggleTask = async (status: "inprogress" | "completed") => {
    await api.put(`/tasks/${task._id}`, {
      status,
      title: task.title,
    })
    toast.success(
      status === "inprogress" ? "Task Started!" : "Task InProgress!"
    )
    refresh()
  }

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`)
    toast.error("Deleted!")
    refresh()
  }

  return (
    <div className="flex justify-between items-center bg-[#1E1F25] rounded mb-2">
      <div className="h-20 w-44 bg-[#212229] flex flex-col justify-center items-center">
        <button
          className="h-9 w-9 bg-[#5051F9] rounded-full flex items-center justify-center hover:bg-indigo-500"
          onClick={() =>
            toggleTask(
              task.status === "inprogress" ? "completed" : "inprogress"
            )
          }
        >
          <PlayIcon fill="white" color="white" className="w-3" />
        </button>
        <p className="leading-none font-semibold text-[#E1E3E7] pt-1">
          {TaskStatus[task.status]}
        </p>
      </div>
      <div className="flex  items-center justify-center w-5">
        <div
          className={cn(
            " h-6 p-4 rounded-2xl font-medium text-xs flex items-center justify-center",
            {
              ["bg-blue-600"]: task.status === "todo",
              ["bg-green-600"]: task.status === "inprogress",
              ["bg-[#FF614C]"]: task.status === "completed",
            }
          )}
        >
          {task.status.toLocaleUpperCase()}
        </div>
      </div>
      <div className="flex flex-col items-center  w-72">
        <span className="text-[#EDEDED] font-medium">{task.title}</span>
      </div>
      <div className="flex gap-2 px-3">
        <button onClick={deleteTask} className="text-sm text-red-400">
          <Trash2 />
        </button>
      </div>
    </div>
  )
}
