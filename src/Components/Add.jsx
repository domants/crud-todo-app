import React, { useState } from "react";
import "../styles/add.css";
import axios from "axios";
export default function Add({ DisplayTodos, setDisplayTodos, addModal }) {
  const [Username, setUsername] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [DOB, setDOB] = useState("");
  const BASE_URL = "http://localhost:5000";

  // adding todos
  const handleAdd = () => {
    let arr = [1, 2, 3, 4, 5];
    let random = "";
    for (let i = 0; i <= arr.length; i++) {
      let randomArr = Math.floor(Math.random() * i);
      random += arr[randomArr];
    }

    if ((Username && Name && Age && DOB) === "") {
      return false;
    } else {
      axios.post(`${BASE_URL}/add/todo`, {
        id: random,
        Username,
        Name,
        Age,
        DOB,
      });
    }
    setDisplayTodos([
      ...DisplayTodos,
      {
        id: random,
        username: Username,
        name: Name,
        age: Age,
        dob: DOB,
      },
    ]);

    setUsername("");
    setName("");
    setAge("");
    setDOB("");
  };

  // Close modal for add
  const handleCloseAdd = () => {
    addModal.current.classList.remove("modal");
  };

  return (
    <div className="container_modal_add">
      <h2>Add New User</h2>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={Username}
          placeholder="username..."
        />
      </label>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          placeholder="name..."
        />
      </label>
      <label htmlFor="age">
        Age:
        <input
          id="age"
          type="number"
          onChange={(e) => setAge(e.target.value)}
          value={Age}
          placeholder="age..."
        />
      </label>
      <label htmlFor="birthday">
        Birthday:
        <input
          id="birthday"
          type="date"
          onChange={(e) => setDOB(e.target.value)}
          value={DOB}
        />
      </label>
      <button id="addbtn" onClick={handleAdd}>
        Add
      </button>
      <button id="closebtn" onClick={handleCloseAdd}>
        &times;
      </button>
    </div>
  );
}
