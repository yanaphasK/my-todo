import requests from "./MainService";

const Auth = {
  login: (username: string, password: string) =>
    requests.post('/users/auth', {username: username, password: password}),
  register: (username: string, password: string) =>
    requests.post('/users/register',  {username: username, password: password})
};

export default Auth;