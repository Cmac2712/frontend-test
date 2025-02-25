import axios from 'axios'
const port = '4000'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:${port}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export function getToDoList() {
  return apiClient.get("/api/todo");
}

export function addTask({ title, importance }) {
  return apiClient.post("/api/todo", {
    title,
    importance
  })
}

export function updateDoneStatus({ id, isDone }) {
  return apiClient.patch(`/api/todo/${id}`, {
    isDone
  })
}

export function deleteTask(id) {
  return apiClient.delete(`/api/todo/${id}`)
}

export function updateTask({ id, title, importance }) {
  return apiClient.patch(`/api/todo/${id}`, {
    title,
    importance
  })
}