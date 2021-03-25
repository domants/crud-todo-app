import express from "express";
import cors from "cors";
import conn from "./database.js";
const app = express();
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodo,
} from "./model/todoModel.js";
const PORT = process.env.PORT || 5000;

// Check connection
conn.connect((err) => {
  err
    ? console.error(`Error connecting in your database! ${err}`)
    : console.log(`Successfully connected in your database`);
});

app.use(express.json());
app.use(cors());

app.use(createTodo);
app.use(deleteTodo);
app.use(editTodo);
app.use(getTodo);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
