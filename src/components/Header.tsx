import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import "../styles.scss";

const LoggedOutView = (props: any) => {
  if (!props.currentUser) {
    return (
      <div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </div>
    );
  }
  return null;
};

const LoggedInView = (props: any) => {
  if (props.currentUser) {
    return (
      <div className="customize-link">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/login" className="nav-link">
          Logout
        </Link>
      </div>
    );
  }

  return null;
};

@inject("commonStore")
@observer
class Header extends Component<any> {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar className="customize-toolbar">
          <Typography variant="h6">{this.props.commonStore.appName}</Typography>
          <LoggedOutView currentUser={this.props.commonStore.token} />
          <LoggedInView currentUser={this.props.commonStore.token} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
