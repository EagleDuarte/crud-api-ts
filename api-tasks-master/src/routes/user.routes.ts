import { Request, Response, Router } from "express";
import { v4 as createUuid } from "uuid";
import { TasksController } from "../controllers/tasks.controller";
import { UserController } from "../controllers/user.controller";
import { tasksList, userList } from "../data/tasksList";

import { logMiddleware } from "../middlewares/log.middleware";

const userRoutes = Router();

userRoutes.use(logMiddleware);

// Faz a listagem e o filtro dos recados pela descrição e detalhe utilizando query. http://localhost:3333/tasks/
userRoutes.get("/", (req: Request, res: Response) => {
  try {
    const { name, userId, tasks } = req.query;

    const controller = new UserController();

    const result = controller.list(
      name as string,
      userId as string,
      tasks as []
    );

    return res.status(200).send({
      ok: true,
      message: "Tasks successfully listed",
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

// Passa-se os parametros diretamente para o corpo. http://localhost:3333/user
userRoutes.post("/", (req: Request, res: Response) => {
  try {
    const { name, pass, Rpass } = req.body;

    if (!name) {
      return res.status(400).send({
        ok: false,
        message: "Name not provided",
      });
    }

    if (!pass) {
      return res.status(400).send({
        ok: false,
        message: "Password not provided",
      });
    }

    new UserController().create(name, pass, Rpass);

    return res.status(201).send({
      ok: true,
      message: "Successfully",
      data: userList,
    });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

// Passa-se os parametros diretamente para o corpo. http://localhost:3333/user
userRoutes.post("/login", (req: Request, res: Response) => {
  try {
    const { name, pass } = req.body;
    if (!name) {
      return res.status(400).send({
        ok: false,
        message: "Name not provided",
      });
    }

    if (!pass) {
      return res.status(400).send({
        ok: false,
        message: "Password not provided",
      });
    }

    const user = userList.find((user) => {
      if (user.name === name && user.pass === pass) {
        return user;
      }
    });
    if (user) {
      return res.status(201).send({
        ok: true,
        message: "Successfully",
        token: createUuid(),
        data: user,
      });
    } else
      return res.status(404).send({
        ok: false,
        message: "User not found",
      });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: "Instabilidade no servidor",
      error: error.toString(),
    });
  }
});

export { userRoutes };
