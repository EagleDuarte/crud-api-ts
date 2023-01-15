import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { tasksRoutes } from "./routes/tasks.routes";
import { userRoutes } from "./routes/user.routes";

const port = process.env.PORT || 3333;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/tasks", tasksRoutes);
app.use("/user", userRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log("API running at port ---> " + port);
});
