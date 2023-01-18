import { Request, Response } from "express";
import { usersField } from "../data/tasksField";
import { User } from "../models/user";
import { Tasks } from "../models/tasks";

export class UserController {
  public list(name: string, userId: string, tasks: []) {
    let lista = usersField;

    if (name) {
      lista = usersField.filter((item) => item.name === name);
    }

    let listaRetorno = lista.map((tasks) => {
      return tasks.getUser();
    });

    return listaRetorno;
  }

  public create(name: string, pass: string, Rpass: string) {
    const user = new User(name, pass, Rpass);
    usersField.push(user);
    return usersField;
  }
}
