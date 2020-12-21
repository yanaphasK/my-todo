import React from "react";
import { inject, observer } from "mobx-react";
import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import Header from "../components/Header";
import "../styles.scss";
import { Link } from "react-router-dom";

@inject("todoStore", "commonStore")
@observer
export default class Todo extends React.Component<any> {
  componentDidMount() {
    if (this.props.commonStore.token === null) {
      this.props.history.replace("/login");
    } else {
      const { id } = this.props.match.params;
      if (id) {
        this.props.todoStore.getTodoById(id).then(() => {});
      }
    }
  }

  componentWillUnmount() {
    this.props.todoStore.reset();
  }

  handleTitleChange = (e: any) => {
    this.props.todoStore.setTitle(e.target.value);
  };

  handleDescriptionChange = (e: any) => {
    this.props.todoStore.setDescription(e.target.value);
  };

  handleSubmitCreateForm = (e: any) => {
    e.preventDefault();
    this.props.todoStore
      .createTodo()
      .then(() => this.props.history.replace("/"));
  };

  handleSubmitEditForm = (e: any) => {
    const { id } = this.props.match.params;
    e.preventDefault();
    this.props.todoStore
      .editTodo(id)
      .then(() => this.props.history.replace("/"));
  };

  render() {
    var { values, errors, inProgress } = this.props.todoStore;
    const { id } = this.props.match.params;
    return (
      <div>
        <Header />
        <Container maxWidth="md">
          <Card className="login-card">
            <Link to={`/`} className="link">
              Back
            </Link>
            <Typography variant="h5" noWrap align="center">
              TODO
            </Typography>
            <form
              noValidate
              autoComplete="off"
              onSubmit={
                id ? this.handleSubmitEditForm : this.handleSubmitCreateForm
              }
            >
              <TextField
                id="login-username"
                label="Title"
                type="text"
                color="secondary"
                value={values.title}
                onChange={this.handleTitleChange}
                fullWidth
              />
              <br />
              <TextField
                id="login-username"
                label="Description"
                type="text"
                color="secondary"
                value={values.description}
                onChange={this.handleDescriptionChange}
                fullWidth
              />
              <br />
              <Button
                className="login-btn"
                color="primary"
                disabled={inProgress}
                type="submit"
              >
                {id ? "EDIT" : "ADD"}
              </Button>
            </form>
          </Card>
        </Container>
      </div>
    );
  }
}
