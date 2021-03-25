import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/todoApp.css";
import Add from "./Add";
import Edit from "./Edit";
export default function TodoApp() {
  const [DisplayTodos, setDisplayTodos] = useState([]);
  // initialize ID state to pass as props in edit component
  const [ID, setID] = useState("");

  const BASE_URL = "http://localhost:5000";

  // fetch all data
  const fetchTodo = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/todo`);
      // console.log(data);
      setDisplayTodos(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTodo();
  }, []);

  const addModal = useRef();
  const handleModalAdd = () => {
    addModal.current.classList.add("modal");
  };

  // delete todo
  const handleDelete = (id) => {
    console.log(id);
    setDisplayTodos(DisplayTodos.filter((todo) => todo.id !== id));
    axios.delete(`${BASE_URL}/todo/delete/${id}`);
  };

  const editModal = useRef();
  const handleModalEdit = (id) => {
    editModal.current.classList.add("modal");

    // filtering ID to pass as props
    let filteredID = DisplayTodos.filter((todo) => {
      return todo.id === id ? todo : null;
    });
    // console.log(filteredID[0].id);
    setID(filteredID[0].id);
  };

  return (
    <div className="container">
      <h1>TODO APP</h1>
      <hr />
      <button className="add_btn" onClick={handleModalAdd}>
        Add
      </button>
      <div className="content">
        <h2>users list</h2>

        <h4
          className="no_users_found"
          style={
            DisplayTodos.length >= 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          No users found!
        </h4>
        <table
          style={
            DisplayTodos.length <= 0
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          <thead
            style={
              DisplayTodos.length > 0
                ? { borderBottom: "3px solid rgb(68 128 100 / 61%)" }
                : { borderBottom: "none" }
            }
          >
            <tr id="title">
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Age</th>
              <th>Birthday</th>
              <th>Actions</th>
            </tr>
          </thead>
          {DisplayTodos.map((todo, index) => {
            return (
              <tbody key={todo.id}>
                <tr id="body">
                  <td>{todo.id}</td>
                  <td>{todo.username}</td>
                  <td>{todo.name}</td>
                  <td>{todo.age}</td>
                  <td>{todo.dob}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleModalEdit(todo.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {/* ---Component For modal add ---*/}
      <div ref={addModal} id="add" className="container_add">
        <Add
          addModal={addModal}
          setDisplayTodos={setDisplayTodos}
          DisplayTodos={DisplayTodos}
        />
      </div>
      {/* --- end of modal add --- */}
      {/*---Component For modal edit ---*/}
      <div ref={editModal} id="edit" className="container_edit">
        <Edit
          id={ID}
          editModal={editModal}
          DisplayTodos={DisplayTodos}
          setDisplayTodos={setDisplayTodos}
        />
      </div>

      {/*--- end of modal edit --- */}
    </div>
  );
}
