import { Button, Card, CircularProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import TodoStore from "../stores/TodoStore";
import "../styles.scss";
import NoteIcon from "@material-ui/icons/Note";

const TodoList = (props: any) => {
  let history = useHistory();

  const deleteTodo = (id: string) => {
    TodoStore.deleteTodo(id).then(() => props.todoStore.loadTodos());
  };

  const updateTodo = (id: string) => {
    history.replace(`/todo/${id}`);
  };

  return (
    <div className="note-list">
      {props.todos.map((todo: any) => {
        return (
          <Card className="note-card" key={todo._id}>
            <div>
              <div className="note-title">
                <NoteIcon htmlColor="#fe6b8b" />
                <h1>{todo.title}</h1>
              </div>
              <p>{todo.description}</p>
            </div>
            <Button
              color="secondary"
              onClick={() => {
                updateTodo(todo._id);
              }}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                deleteTodo(todo._id);
              }}
            >
              Delete
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default TodoList;
