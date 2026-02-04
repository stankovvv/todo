import React, { useEffect, useState } from "react";
import './App.css';

const API_URL = "http://localhost:3000/api/ToDos";



export default function App() {
  const [ToDos, setToDo] = useState([]);
  const [newTask, setnewTask] = useState("");

  const fetchToDo = async () => {
  try {
    const res = await axios.get(API_URL);
    setToDo(res.data);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchToDo();
  }, []);

  const AddToDo = async () => {
    const res = await axios.post(API_URL, {text: newTask});
    setToDo((prev) => [...prev, res.data]);
    setnewTask("");
  };


  return (
    <>
      <div>
        <div class='title'>
          <h1>ToDo.com</h1>
        </div>
        <div class='add_button'>
          <button class='add_button' onClick={AddToDo}>Add task</button>
          <input 
          value={newTask}
          onChange={(e) => setnewTask(e.target.value)}
          placeholder="New task"
          />
        </div>
        <div class='container'>
          <div class='un done boxlist'>
            <div class='list'>
              <p>left box</p>
            </div>
          </div>
          <div class='done boxlist'>
            <div class='list'>
              <p>right box</p>
              <ul>
                {ToDos.map((T) => (
                  <li key={T.id}>{T.text}{" "}
                  <button>Edit</button>{" "}
                  <button>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

