import { Request, Response, Router } from "express";

import { TasksController } from "../controllers/tasks.controller";
import { tasksList } from "../data/tasksList";

import { logMiddleware } from "../middlewares/log.middleware";

const tasksRoutes = Router();

tasksRoutes.use(logMiddleware);

// GET http://localhost:3333/tasks/ (com query description e detail)
// Listar todas tasks filtrando por description e detail
tasksRoutes.get("/", (req: Request, res: Response) => {
  try {
    const { description, detail, name } = req.headers;

    const allTasks = new TasksController().list(
      description as string,
      detail as string
    );

    const userTasks = allTasks.filter((tasks) => {
      if (tasks.name === name) return tasks;
    });

    return res.status(200).send({
      ok: true,
      message: "Tasks successfully listed",
      data: userTasks,
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

// Abaixo os parametros de rota: http://localhost:3333/tasks/id
tasksRoutes.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    let tasks = tasksList.find((item) => item.id === id);

    if (!tasks) {
      return res.status(404).send({
        ok: false,
        message: "Tasks not found",
      });
    }

    return res.status(200).send({
      ok: true,
      message: "Tasks successfully obtained",
      data: tasks,
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

// POST http://localhost:3333/tasks
// Passa-se os arâmetros dire=> body
tasksRoutes.post("/", (req: Request, res: Response) => {
  try {
    const { description, detail, name } = req.body;

    if (!description) {
      return res.status(400).send({
        ok: false,
        message: "Description not provided",
      });
    }

    if (!detail) {
      return res.status(400).send({
        ok: false,
        message: "Detail not provided",
      });
    }

    new TasksController().create(description, detail, name);

    return res.status(201).send({
      ok: true,
      message: "Tasks successfully created",
      data: tasksList,
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

// DELETE http://localhost:3333/tasks/id
// Route param
tasksRoutes.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    let tasksIndex = tasksList.findIndex((item) => item.id === id);

    if (tasksIndex < 0) {
      return res.status(404).send({
        ok: false,
        message: "Tasks not found",
      });
    }

    tasksList.splice(tasksIndex, 1);

    return res.status(200).send({
      ok: true,
      message: "Tasks successfully deleted",
      data: tasksList,
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

// PUT http://localhost:3333/tasks/id
// id => route param
// dados alteracao => body
tasksRoutes.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { description, detail } = req.body;

    const controller = new TasksController();
    const result = controller.update(id, description, detail);

    if (!result) {
      return res.status(404).send({
        ok: false,
        message: "Task não existe",
      });
    }

    return res.status(200).send({
      ok: true,
      message: "Task atualizado com sucesso",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

export { tasksRoutes };
