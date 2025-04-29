import { listModel } from "../models/list.model.js"
import { boardModel } from "../models/board.model.js"

export const getLists = async (req, res) => {
  const lists = await listModel.findAll(req.params.boardId)
  res.json(lists)
}

export const getList = async (req, res) => {
  const list = await listModel.findById(req.params.id)
  if (!list) return res.status(404).json({ message: "List not found" })
  res.json(list)
}

export const createList = async (req, res) => {
  const { title } = req.body
  const board = await boardModel.findById(req.params.boardId)
  if (!board) return res.status(404).json({ message: "Board not found" })

  const newList = await listModel.create(title, req.params.boardId)
  res.status(201).json(newList)
}

export const updateList = async (req, res) => {
  const updated = await listModel.update(req.params.id, req.body.title)
  if (!updated) return res.status(404).json({ message: "List not found" })
  res.json(updated)
}

export const deleteList = async (req, res) => {
  const deleted = await listModel.remove(req.params.id)
  if (!deleted) return res.status(404).json({ message: "List not found" })
  res.json({ message: "List deleted" })
}
