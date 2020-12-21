import { observable, action, makeAutoObservable } from "mobx";
import commonStore from "./CommonStore";
import Auth from "../services/AuthService";

class AuthStore {
  @observable inProgress: boolean = false;
  @observable errors: any = undefined;

  @observable values = {
    username: "saintzst",
    password: "12345",
  };

  constructor() {
    makeAutoObservable(this);
  }

  @action setUsername(username: string) {
    this.values.username = username;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action setError(message: string) {
    this.errors = message;
  }

  @action reset() {
    this.errors = undefined;
    this.values.username = "";
    this.values.password = "";
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return Auth.login(this.values.username, this.values.password)
      .then((user: any) => commonStore.setToken(user.token))
      .catch((err: any) => {
        let error = err.message;
        this.setError(error);
      })
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return Auth.register(this.values.username, this.values.password)
      .then((user: any) => commonStore.setToken(user.token))
      .catch((err: any) => {
        let error = err.message;
        this.setError(error);
      })
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action logout() {
    commonStore.setToken(undefined);
    return Promise.resolve();
  }
}

export default new AuthStore();
