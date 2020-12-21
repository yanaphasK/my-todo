// import Header from "./components/Header";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Register from "./pages/Register";

@inject("commonStore")
@observer
export default class App extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/todo/:id" component={Todo} />
            <Route path="/todo" component={Todo} />

            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      );
    }
    return null;
  }
}
