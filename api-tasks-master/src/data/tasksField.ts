import { listaTasks, Tasks } from "../models/tasks";
import { User } from "../models/user";

export const tasksField = [
  new Tasks("testing task one", "testing task one", "user1@teste.com"),
  new Tasks("testing task two", "testing task two", "user2@teste.com"),
];

export const usersField = [
  new User("user1@teste.com", "1111", "1111"),
  new User("user2@teste.com", "2222", "2222"),
  new User("user3@teste.com", "3333", "3333"),
];
