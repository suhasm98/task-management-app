const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title, user: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
