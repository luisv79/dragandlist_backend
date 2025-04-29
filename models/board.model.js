import { pool } from "../database/connection.js"

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM boards")
  return rows
}

const create = async (title) => {
  const query = "INSERT INTO boards (title) VALUES ($1) RETURNING *"
  const values = [title]
  const { rows } = await pool.query(query, values)
  return rows[0]
}

const remove = async (id) => {
  const query = "DELETE FROM boards WHERE id = $1 RETURNING *"
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

const findById = async (id) => {
  const query = "SELECT * FROM boards WHERE id = $1"
  const { rows } = await pool.query(query, [id])
  return rows[0]
}


export const boardModel = {
  findAll,
  findById, 
  create,
  remove,
}