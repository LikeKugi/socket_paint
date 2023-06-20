import {makeAutoObservable} from "mobx";

class UserState {
  userName = ''
  users: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setUsername(user: string) {
    this.userName = user;
  }
  addUser(user: string) {
    this.users.push(user);
  }
}

export default new UserState();
