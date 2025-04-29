import { pool } from "../database/connection.js"

const findAll = async (boardId) => {
  const query = "SELECT * FROM lists WHERE board_id = $1"
  const { rows } = await pool.query(query, [boardId])
  return rows
}

const findById = async (id) => {
  const query = "SELECT * FROM lists WHERE id = $1"
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

const create = async (title, boardId) => {
  const query =
    "INSERT INTO lists (title, board_id) VALUES ($1, $2) RETURNING *"
  const values = [title, boardId]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

const update = async (id, title) => {
  const query = "UPDATE lists SET title = $1 WHERE id = $2 RETURNING *"
  const values = [title, id]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

const remove = async (id) => {
  const query = "DELETE FROM lists WHERE id = $1 RETURNING *"
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

export const listModel = {
  findAll,
  findById,
  create,
  update,
  remove,
}
