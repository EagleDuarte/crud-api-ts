import { Request, Response } from "express";
import { tasksField } from "../data/tasksField";
import { Tasks } from "../models/tasks";

export class TasksController {
  public list(description: string, detail: string) {
    let lista = tasksField;

    if (description) {
      lista = tasksField.filter((item) => item.description === description);
    }

    if (detail) {
      lista = tasksField.filter((item) => item.detail == detail);
    }

    let listaRetorno = lista.map((tasks) => {
      return tasks.getTasks();
    });

    return listaRetorno || ([] as any);
  }

  public update(id: string, description: string, detail: string) {
    const tasks = tasksField.find((item) => item.id === id);

    if (!tasks) {
      return undefined;
    }

    tasks.description = description;
    tasks.detail = detail;

    return tasksField;
  }

  public create(description: string, detail: string, name: string) {
    const task = new Tasks(description, detail, name);
    tasksField.push(task);
    return tasksField;
  }
}
