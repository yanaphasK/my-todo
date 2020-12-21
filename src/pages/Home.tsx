import React from "react";
import { inject, observer } from "mobx-react";
import TodoList from "../components/TodoList";
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "../styles.scss";
import Header from "../components/Header";

@inject("todoStore", "commonStore")
@observer
export default class Home extends React.Component<any> {
  componentDidMount() {
    if (this.props.commonStore.token === null) {
      this.props.history.replace("/login");
    } else {
      this.props.todoStore.loadTodos();
    }
  }

  goToAddTodoForm = () => {
    this.props.history.replace("/todo");
  };

  render() {
    const { todos, isLoading } = this.props.todoStore;

    return (
      <div>
        <Header />
        <div className="todo-container">
          <div>
            <Typography variant="h4" noWrap align="center">
              My Todo
            </Typography>
          </div>
          <br />
          <div>
            {todos && todos.length ? (
              <TodoList {...this.props} todos={todos} loading={isLoading} />
            ) : (
              <div className="todo-preview">No todo.</div>
            )}
          </div>
          <div>
            <Button
              onClick={() => {
                this.goToAddTodoForm();
              }}
              className="login-btn"
              color="primary"
            >
              <AddIcon />
              ADD TODO
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
