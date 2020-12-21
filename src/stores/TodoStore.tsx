import { observable, action, reaction, makeAutoObservable } from "mobx";
import Todo from "../services/TodoService";

class TodoStore {
  @observable inProgress: boolean = false;
  @observable errors = undefined;
  @observable isLoading = false;
  @observable todos: Array<any> = [];
  @observable values = {
    title: "",
    description: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  @action setTitle(title: string) {
    this.values.title = title;
  }

  @action setDescription(description: string) {
    this.values.description = description;
  }

  @action reset() {
    this.values.title = "";
    this.values.description = "";
  }

  @action createTodo() {
    this.inProgress = true;
    this.errors = undefined;
    return Todo.create(this.values.title, this.values.description)
      .then((todo: any) => this.loadTodos())
      .catch(
        action((err: any) => {
          this.errors =
            err.response &&
            err.response.body &&
            err.response.body.errors &&
            err.message;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action editTodo(id: string) {
    this.inProgress = true;
    this.errors = undefined;
    return Todo.update(id, this.values.title, this.values.description)
      .catch(
        action((err: any) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action deleteTodo(id: string) {
    this.inProgress = true;
    this.errors = undefined;
    return Todo.delete(id)
      .catch(
        action((err: any) => {
          this.errors =
            err.response &&
            err.response.body &&
            err.response.body.errors &&
            err.message;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action setTodos(todos: any) {
    this.todos = todos;
  }

  @action loadTodos() {
    this.isLoading = true;
    return Todo.getAll()
      .then((todos: any) => this.setTodos(todos))
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  @action getTodoById(id: string) {
    this.isLoading = true;
    return Todo.getByID(id)
      .then((todo: any) => {
        this.setTitle(todo.title);
        this.setDescription(todo.description);
      })
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }
}

export default new TodoStore();
