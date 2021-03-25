import express from "express";
import {
  ControllerCreate,
  ControllerRead,
  ControllerEdit,
  ControllerDelete,
} from "../controller/todoController.js";

const app = express();

// for creating
export const createTodo = app.post("/add/todo", ControllerCreate);

// for fetching data
export const getTodo = app.get("/todo", ControllerRead);

// for edit
export const editTodo = app.put("/todo/update/:id", ControllerEdit);

// for delete
export const deleteTodo = app.delete("/todo/delete/:id", ControllerDelete);
