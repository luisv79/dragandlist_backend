import { taskModel } from "../models/task.model.js"
import { listModel } from "../models/list.model.js"

export const getTasks = async (req, res) => {
  const tasks = await taskModel.findAll(req.params.listId)
  res.json(tasks)
}

export const getTask = async (req, res) => {
  const task = await taskModel.findById(req.params.id)
  if (!task) return res.status(404).json({ message: "Task not found" })
  res.json(task)
}

export const createTask = async (req, res) => {
  const { title } = req.body
  const list = await listModel.findById(req.params.listId)
  if (!list) return res.status(404).json({ message: "List not found" })

  const newTask = await taskModel.create(title, req.params.listId)
  res.status(201).json(newTask)
}

export const updateTask = async (req, res) => {
  const updated = await taskModel.update(req.params.id, req.body)
  if (!updated) return res.status(404).json({ message: "Task not found" })
  res.json(updated)
}

export const deleteTask = async (req, res) => {
  const deleted = await taskModel.remove(req.params.id)
  if (!deleted) return res.status(404).json({ message: "Task not found" })
  res.json({ message: "Task deleted" })
}
