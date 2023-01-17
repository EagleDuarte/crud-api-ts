import { Request, Response } from "express";
import { tasksList } from "../data/tasksList";
import { Tasks } from "../models/tasks";

export class TasksController {
  public list(description: string, detail: string) {
    let lista = tasksList;

    if (description) {
      lista = tasksList.filter((item) => item.description === description);
    }

    if (detail) {
      lista = tasksList.filter((item) => item.detail == detail);
    }

    let listaRetorno = lista.map((tasks) => {
      return tasks.getTasks();
    });

    return listaRetorno || ([] as any);
  }

  public update(id: string, description: string, detail: string) {
    const tasks = tasksList.find((item) => item.id === id);

    if (!tasks) {
      return undefined;
    }

    tasks.description = description;
    tasks.detail = detail;

    return tasksList;
  }

  public create(description: string, detail: string, name: string) {
    const task = new Tasks(description, detail, name);
    tasksList.push(task);
    return tasksList;
  }
}
