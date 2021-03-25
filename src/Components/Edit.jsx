import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/edit.css";
export default function Edit({ id, DisplayTodos, setDisplayTodos, editModal }) {
  const [Username, setUsername] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [DOB, setDOB] = useState("");
  const [ID, setID] = useState("");
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    for (let i = 0; i < DisplayTodos.length; i++) {
      if (DisplayTodos[i].id === id) {
        setID(DisplayTodos[i].id);
        setUsername(DisplayTodos[i].username);
        setName(DisplayTodos[i].name);
        setAge(DisplayTodos[i].age);
        setDOB(DisplayTodos[i].dob);
      }
    }
  }, [DisplayTodos, id]);

  // Close modal for edit
  const handleCloseEdit = () => {
    editModal.current.classList.remove("modal");
  };

  // update todo
  const handleUpdate = () => {
    // console.log(id);
    if ((Username && Name && Age && DOB) === "") {
      return false;
    } else {
      axios.put(`${BASE_URL}/todo/update/${id}`, {
        Username,
        Name,
        Age,
        DOB,
      });

      setDisplayTodos(
        DisplayTodos.map((todo) => {
          return todo.id === id
            ? {
                id: ID,
                username: Username,
                name: Name,
                age: Age,
                dob: DOB,
              }
            : todo;
        })
      );
    }

    setUsername("");
    setName("");
    setAge("");
    setDOB("");

    editModal.current.classList.remove("modal");
  };

  return (
    <div className="container_modal_edit">
      <h2>Edit User</h2>
      <input type="hidden" onChange={(e) => setID(e.target.value)} value={ID} />
      <label htmlFor="username">
        Username:
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={Username}
          placeholder="username..."
        />
      </label>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          placeholder="name..."
        />
      </label>
      <label htmlFor="age">
        Age:
        <input
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={Age}
          placeholder="age..."
        />
      </label>
      <label htmlFor="birthday">
        Birthday:
        <input
          type="date"
          onChange={(e) => setDOB(e.target.value)}
          value={DOB}
        />
      </label>
      <button id="updatebtn" onClick={handleUpdate}>
        Update
      </button>
      <button id="closebtn" onClick={handleCloseEdit}>
        &times;
      </button>
    </div>
  );
}
