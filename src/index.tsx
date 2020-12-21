import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, HashRouter, StaticRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./App";

import authStore from "./stores/AuthStore";
import commonStore from "./stores/CommonStore";
import todoStore from "./stores/TodoStore";

const stores = {
  authStore,
  commonStore,
  todoStore,
};

ReactDOM.render(
  <Provider
    authStore={authStore}
    commonStore={commonStore}
    todoStore={todoStore}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
