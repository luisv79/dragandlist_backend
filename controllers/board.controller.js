import { boardModel } from "../models/board.model.js"

export const getBoards = async (req, res) => {
  const boards = await boardModel.findAll()
  res.json(boards)
}

export const getBoard = async (req, res) => {
  const board = await boardModel.findById(req.params.id)
  if (!board) return res.status(404).json({ message: "Board not found" })
  res.json(board)
}

export const createBoard = async (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ message: "Title is required" })
  const newBoard = await boardModel.create(title)
  res.status(201).json(newBoard)
}

export const deleteBoard = async (req, res) => {
  const deleted = await boardModel.remove(req.params.id)
  if (!deleted) return res.status(404).json({ message: "Board not found" })
  res.json({ message: "Board deleted" })
}
