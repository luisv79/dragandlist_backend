import { Router } from "express"
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js"

const router = Router()

router.get("/lists/:listId/tasks", getTasks)
router.get("/tasks/:id", getTask)
router.post("/lists/:listId/tasks", createTask)
router.put("/tasks/:id", updateTask)
router.delete("/tasks/:id", deleteTask)

export default router
