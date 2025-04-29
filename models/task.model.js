import { pool } from "../database/connection.js"

const findAll = async (listId) => {
  const query = "SELECT * FROM tasks WHERE list_id = $1"
  const { rows } = await pool.query(query, [listId])
  return rows
}

const findById = async (id) => {
  const query = "SELECT * FROM tasks WHERE id = $1"
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

const create = async (title, listId) => {
  const query =
    "INSERT INTO tasks (title, list_id) VALUES ($1, $2) RETURNING *"
  const values = [title, listId]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

const update = async (id, { title, done, list_id }) => {
  const query = `
    UPDATE tasks 
    SET 
      title = COALESCE($1, title),
      done = COALESCE($2, done),
      list_id = COALESCE($3, list_id)
    WHERE id = $4 RETURNING *;
  `
  const values = [title, done, list_id, id]
  const { rows } = await pool.query(query, values)
  return rows[0]
}


const remove = async (id) => {
  const query = "DELETE FROM tasks WHERE id = $1 RETURNING *"
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

export const taskModel = {
  findAll,
  findById,
  create,
  update,
  remove,
}
