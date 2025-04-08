import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  fetchTasksFailure,
  fetchTasksStart,
  fetchTasksSuccess,
} from "@/features/tasks/taskSlice"
import { toast } from "react-toastify"
import Layout from "@/components/Layout"
import api from "@/api/axios"
import TaskList from "@/components/TaskList"

const Tasks = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const fetchTasks = async () => {
    try {
      dispatch(fetchTasksStart())
      const res = await api.get("/tasks")
      dispatch(fetchTasksSuccess(res.data))
    } catch (err) {
      dispatch(fetchTasksFailure("Failed to load tasks"))
    }
  }

  const addTask = async () => {
    api
      .post("/tasks", { title })
      .then((res) => {
        toast.success("Task added")
        setTitle("")
        fetchTasks()
      })
      .catch((err) => toast.error(err.response.data.message))
  }

  useEffect(() => {
    fetchTasks()
  }, [])
  return (
    <Layout>
      <div className="  mt-10 p-4 bg-[#1E1F25] shadow rounded">
        <h2 className="text-xl font-bold mb-4 text-white">New Task</h2>
        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block input w-full rounded-md bg-[#050505] px-3 py-1.5 text-base text-white  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#5051F9] sm:text-sm/6"
            placeholder="Task title"
          />
          <button
            onClick={addTask}
            className="flex justify-center rounded-md bg-[#5051F9] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </div>
      <TaskList fetchTasks={fetchTasks} />
    </Layout>
  )
}

export default Tasks
