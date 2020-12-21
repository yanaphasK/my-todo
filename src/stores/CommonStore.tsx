import { observable, action, reaction, makeAutoObservable } from "mobx";

class CommonStore {
  @observable appName = "Todo";
  @observable token = window.localStorage.getItem("jwt");
  @observable appLoaded = false;

  @observable tags = [];
  @observable isLoadingTags = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @action setToken(token: any) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
