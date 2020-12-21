import React from "react";
import "../styles.scss";
import { inject, observer } from "mobx-react";
import {
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

@inject("authStore")
// @withRouter
@observer
export default class Register extends React.Component<any> {
  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = (e: any) => {
    this.props.authStore.setUsername(e.target.value);
  };

  handlePasswordChange = (e: any) => {
    this.props.authStore.setPassword(e.target.value);
  };

  handleSubmitForm = (e: any) => {
    e.preventDefault();
    this.props.authStore.register().then((res: any) => {
      if (res) this.props.history.replace("/login");
    });
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;
    console.log(errors);
    return (
      <Container className="login-container" maxWidth="md">
        <Card className="login-card">
          <Typography variant="h5" noWrap align="center">
            REGISTER TODO
          </Typography>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmitForm}>
            <TextField
              id="login-username"
              label="UserName"
              className="text-field"
              type="text"
              color="secondary"
              value={values.username}
              onChange={this.handleUsernameChange}
              fullWidth
            />
            <br />
            <TextField
              id="login-password"
              label="Password"
              className="text-field"
              type="text"
              color="secondary"
              value={values.password}
              onChange={this.handlePasswordChange}
              fullWidth
            />
            {errors ? (
              <div>
                {errors}
                <br />
              </div>
            ) : null}
            <Button
              className="login-btn"
              color="primary"
              variant="contained"
              disabled={inProgress}
              type="submit"
            >
              REGISTER
            </Button>
            <br />
            <Link to={`/login`} className="link">
              SIGN IN
            </Link>
          </form>
        </Card>
      </Container>
    );
  }
}
