import express from "express"
import cors from "cors"
import "dotenv/config"
import "./database/connection.js"

import boardRoutes from "./routes/board.routes.js"
import listRoutes from "./routes/list.routes.js"
import taskRoutes from "./routes/task.routes.js"

const app = express() // ← Esto debe ir antes de usar "app"

app.use(cors())
app.use(express.json())

// Ahora sí puedes usar app.use(...)
app.use("/boards", boardRoutes)
app.use(listRoutes)
app.use(taskRoutes)

// GET /boards
app.get("/boards", async (req, res) => {
    const boards = await boardModel.findAll()
    res.json(boards)
  })

  app.get("/boards/:id", async (req, res) => {
    const board = await boardModel.findById(req.params.id)
    if (!board) return res.status(404).json({ message: "Board not found" })
    res.json(board)
  })
  
  
  // POST /boards
  app.post("/boards", async (req, res) => {
    const { title } = req.body
    if (!title) return res.status(400).json({ message: "Title is required" })
    const newBoard = await boardModel.create(title)
    res.status(201).json(newBoard)
  })
  
  // DELETE /boards/:id
  app.delete("/boards/:id", async (req, res) => {
    const deleted = await boardModel.remove(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Board not found" })
    res.json({ message: "Board deleted" })
  })

  // GET all lists for a board
app.get("/boards/:boardId/lists", async (req, res) => {
    const lists = await listModel.findAll(req.params.boardId)
    res.json(lists)
  })
  
  // GET one list by ID
  app.get("/lists/:id", async (req, res) => {
    const list = await listModel.findById(req.params.id)
    if (!list) return res.status(404).json({ message: "List not found" })
    res.json(list)
  })
  
  // POST a new list in a board
  app.post("/boards/:boardId/lists", async (req, res) => {
    const { title } = req.body
    const boardId = req.params.boardId
  
    if (!title) return res.status(400).json({ message: "Title is required" })
  
    const newList = await listModel.create(title, boardId)
    res.status(201).json(newList)
  })
  
  // PUT update list title
  app.put("/lists/:id", async (req, res) => {
    const { title } = req.body
    const updated = await listModel.update(req.params.id, title)
  
    if (!updated) return res.status(404).json({ message: "List not found" })
  
    res.json(updated)
  })
  
  // DELETE a list
  app.delete("/lists/:id", async (req, res) => {
    const deleted = await listModel.remove(req.params.id)
  
    if (!deleted) return res.status(404).json({ message: "List not found" })
  
    res.json({ message: "List deleted" })
  })

  // GET all tasks from a list
app.get("/lists/:listId/tasks", async (req, res) => {
    const tasks = await taskModel.findAll(req.params.listId)
    res.json(tasks)
  })
  
  // GET single task
  app.get("/tasks/:id", async (req, res) => {
    const task = await taskModel.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
  })
  
  // POST new task to a list
  app.post("/lists/:listId/tasks", async (req, res) => {
    const { title } = req.body
    const listId = req.params.listId
  
    if (!title) return res.status(400).json({ message: "Title is required" })
  
    const list = await listModel.findById(listId)
    if (!list) return res.status(404).json({ message: "List not found" })
  
    const newTask = await taskModel.create(title, listId)
    res.status(201).json(newTask)
  })
  
  // PUT update task
  app.put("/tasks/:id", async (req, res) => {
    const updated = await taskModel.update(req.params.id, req.body)
    if (!updated) return res.status(404).json({ message: "Task not found" })
    res.json(updated)
  })
  
  // DELETE task
  app.delete("/tasks/:id", async (req, res) => {
    const deleted = await taskModel.remove(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Task not found" })
    res.json({ message: "Task deleted" })
  })



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

