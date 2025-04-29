import { Router } from "express"
import {
  getBoards,
  getBoard,
  createBoard,
  deleteBoard,
} from "../controllers/board.controller.js"

const router = Router()

router.get("/", getBoards)
router.get("/:id", getBoard)
router.post("/", createBoard)
router.delete("/:id", deleteBoard)

export default router
