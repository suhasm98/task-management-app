const Task = require("../models/Task")
const { format, subDays, startOfDay } = require("date-fns")

exports.createTask = async (req, res) => {
  try {
    const { title, status } = req.body

    const task = new Task({
      title,
      status: status || "todo",
      user: req.user._id,
      completedAt: status === "completed" ? new Date() : null,
    })

    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: "Error creating task" })
  }
}

exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query

    const query = { user: req.user._id }
    if (status) query.status = status

    const tasks = await Task.find(query).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, status } = req.body

    const updateData = {}
    if (title) updateData.title = title

    if (status) {
      updateData.status = status
      updateData.completedAt = status === "completed" ? new Date() : null
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updateData,
      { new: true }
    )

    if (!task) return res.status(404).json({ message: "Task not found" })

    res.json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error updating task" })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id })
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" })
  }
}

exports.getTaskStats = async (req, res) => {
  try {
    const range = req.query.range === "30d" ? "30d" : "7d" // Default to 7d
    const days = range === "30d" ? 30 : 7

    const startDate = startOfDay(subDays(new Date(), days - 1))
    const tasks = await Task.find({
      user: req.user._id,
      updatedAt: { $gte: startDate },
    })

    // Initialize empty stats map
    const stats = {}
    for (let i = 0; i < days; i++) {
      const day = format(subDays(new Date(), i), "yyyy-MM-dd")
      stats[day] = { todo: 0, inprogress: 0, completed: 0 }
    }

    // Fill data
    tasks.forEach((task) => {
      const dateKey = format(startOfDay(task.updatedAt), "yyyy-MM-dd")
      if (stats[dateKey]) {
        stats[dateKey][task.status]++
      }
    })

    // Return sorted (chronological) result
    const sorted = Object.keys(stats)
      .sort()
      .reduce((obj, key) => {
        obj[key] = stats[key]
        return obj
      }, {})

    res.json(sorted)
  } catch (err) {
    console.error("Error fetching stats:", err)
    res.status(500).json({ message: "Failed to fetch task statistics" })
  }
}
