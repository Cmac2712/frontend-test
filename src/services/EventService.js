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