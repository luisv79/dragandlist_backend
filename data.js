import { readFile, writeFile } from "node:fs/promises"

const FILE_PATH = "trello.json"

export const getBoards = async () => {
  const data = await readFile(FILE_PATH, "utf-8")
  return JSON.parse(data)
}

export const saveBoards = async (boards) => {
  await writeFile(FILE_PATH, JSON.stringify(boards, null, 2))
}
