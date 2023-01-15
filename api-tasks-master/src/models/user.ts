import { v4 as createUuid } from "uuid";
import { Tasks } from "../models/tasks";

export class User {
  private _userId: string;

  constructor(
    private _name: string,
    private _pass: string,
    private _Rpass: string,
    public _tasks?: Tasks
  ) {
    this._userId = createUuid();
    this._tasks = this._tasks;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get pass() {
    return this._pass;
  }

  public set pass(pass: string) {
    this._pass = pass;
  }

  public get Rpass() {
    return this._Rpass;
  }

  public set Rpass(Rpass: string) {
    this._Rpass = Rpass;
  }

  public get userId() {
    return this._userId;
  }

  // public get tasks(): Tasks {
  //   return this._tasks
  // }

  public getUser() {
    return {
      userId: this._userId,
      name: this._name,
      pass: this._pass,
      Rpass: this._Rpass,
      tasks: this._tasks,
    };
  }
}
