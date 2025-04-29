import { Router } from "express"
import {
  getLists,
  getList,
  createList,
  updateList,
  deleteList,
} from "../controllers/list.controller.js"

const router = Router()

router.get("/boards/:boardId/lists", getLists)
router.get("/lists/:id", getList)
router.post("/boards/:boardId/lists", createList)
router.put("/lists/:id", updateList)
router.delete("/lists/:id", deleteList)

export default router
