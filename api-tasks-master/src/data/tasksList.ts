import { listaTasks, Tasks } from "../models/tasks";
import { User } from "../models/user";

export const tasksList = [
  new Tasks("task 01", "task 01", "aa"),
  new Tasks("task 02", "task 02", "teste1@teste.com"),
];

export const userList = [
  new User("teste1@teste.com", "0987!", "0987!"),
  new User("teste2@teste.com", "0987!", "0987!"),
  new User("aa", "aa", "aa"),
];
