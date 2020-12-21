import requests from "./MainService";

const Todo = {
  getAll: () => requests.get("/todos"),
  getByID: (id: string) => requests.get(`/todos/${id}`),
  create: (title: string, description: string) =>
    requests.post("/todos", { title: title, description: description }),
  update: (id: string, title: string, description: string) =>
    requests.put(`/todos/${id}`, { title: title, description: description }),
  delete: (id: string) => requests.del(`/todos/${id}`),
};

export default Todo;
