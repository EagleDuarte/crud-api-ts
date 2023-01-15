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

  // public update(userId: string, tasks: Tasks) {
  //   const user = userList.find((item) => item.userId === userId);

  //   if (!user) {
  //     return undefined;
  //   }

  //   user.tasks? = tasks:Tasks

  //   return userList;
  // }

  // public createTasks(req: Request, res: Response) {
  //   const { description, detail } = req.body;
  //   const { id } = req.params;

  //   const tasks = tasksList.find((task) => task.id === id);

  //   if (!tasks) {
  //     return res.status(404).json({ message: "Task não encontrado!" });
  //   }
  //   tasksList.push(tasks);
  //   return tasksList;
  // }

  public create(name: string, pass: string, Rpass: string) {
    const user = new User(name, pass, Rpass);
    userList.push(user);
    return userList;
  }
}
