import conn from "../database.js";

export const ControllerCreate = (req, res) => {
  const id = req.body.id;
  const username = req.body.Username;
  const name = req.body.Name;
  const age = req.body.Age;
  const dob = req.body.DOB;

  const sqlAdd =
    "INSERT INTO todo_tbl (id, username, name, age, dob) VALUES (?,?,?,?,?)";

  conn.query(sqlAdd, [id, username, name, age, dob], (err, result) => {
    err ? console.error(err) : console.log(result);
  });
};

export const ControllerRead = (req, res) => {
  const sqlGetTodos = "SELECT * FROM  todo_tbl";

  conn.query(sqlGetTodos, (err, result) => {
    err ? console.error(err) : res.send(result);
  });
};

export const ControllerEdit = (req, res) => {
  const id = req.params.id;
  const username = req.body.Username;
  const name = req.body.Name;
  const age = req.body.Age;
  const dob = req.body.DOB;
  const sqlEdit = `UPDATE todo_tbl SET username = ?, name = ?, age = ?, dob = ? WHERE id = ${id}`;
  conn.query(sqlEdit, [username, name, age, dob], (err, result) => {
    err ? console.error(err) : console.log(result);
  });
};

export const ControllerDelete = (req, res) => {
  const id = req.params.id;

  const sqlDelete = "DELETE FROM todo_tbl WHERE id = ?";

  conn.query(sqlDelete, [id], (err, result) => {
    err ? console.error(err) : console.log(result);
  });
};
