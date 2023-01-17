import { Request, Response } from "express";
import { userList } from "../data/tasksList";
import { User } from "../models/user";
import { Tasks } from "../models/tasks";

export class UserController {
  public list(name: string, userId: string, tasks: []) {
    let lista = userList;

    if (name) {
      lista = userList.filter((item) => item.name === name);
    }

    let listaRetorno = lista.map((tasks) => {
      return tasks.getUser();
    });

    return listaRetorno;
  }

  public create(name: string, pass: string, Rpass: string) {
    const user = new User(name, pass, Rpass);
    userList.push(user);
    return userList;
  }
}
