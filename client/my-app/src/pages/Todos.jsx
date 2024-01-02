import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Buttons from "./buttons";
import Sorting from "./sorting";

function Todos() {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render, setRender] = useState(0);
  const [renderFilter, setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);

  useEffect(() => {
    console.log(currentUser);
    const current = currentUser[2];
    const fetchTodos = async () => {
      const response = await fetch(
        `http://localhost:4080/api/users/${current}/toDos/get`
      );
      const [json] = await response.json();
      console.log(json);
      setTodos(json);
      // setJson(json);
    };
    fetchTodos();
  }, [render]);

  useEffect(() => {
    setTodos(todosFilter);
  }, [renderFilter]);

  function add() {
    let content = prompt();
    if (content == null) {
      return;
    }
    fetch(`http://localhost:4080//api/users/${currentUser[1]}/toDos/add`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser[1],
        title: content,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function changeTodoCompleted(oneTodo) {
    const changeCompleted = !oneTodo.completed;
    const saveTitle = oneTodo.title;
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/toDos/updateComplet/${oneTodo.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: currentUser[1],
          title: saveTitle,
          completed: changeCompleted,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function selectHandler(e) {
    if (e.target.value === "A-Z") {
      let newData = [...todos];
      newData.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        } else {
          return 0;
        }
      });
      setTodos(newData);
    }
    if (e.target.value === "Completed") {
      let newData = [...todos];
      newData.sort((a, b) => {
        if (a.completed) {
          return -1;
        } else if (!a.completed) {
          return 1;
        }
      });
      setTodos(newData);
    }
    if (e.target.value === "uncompleted") {
      let newData = [...todos];
      newData.sort((a, b) => {
        if (a.completed) {
          return 1;
        } else if (!a.completed) {
          return -1;
        }
      });
      setTodos(newData);
    }
    if (e.target.value === "Randomaly") {
      let newData = [...todos];
      newData.sort((x, y) => {
        if (Math.random() < 0.5) {
          return 1;
        } else {
          return -1;
        }
      });
      setTodos(newData);
    }
  }

  return (
    <section>
      <div className=" butLinkToHome">
        <Link to="/User/Home">Home</Link>
      </div>
      <br />
      <Sorting
        todos={json}
        UpdateInformation={setTodos}
        setTodosFilter={setTodosFilter}
        setRenderFilter={setRenderFilter}
        renderFilter={renderFilter}
      />
      <br />

      <select className="filter" onChange={(e) => selectHandler(e)}>
        <option value="A-Z">A-Z</option>
        <option value="Randomaly">Randomaly</option>
        <option value="Completed">Completed</option>
        <option value="uncompleted">uncompleted</option>
      </select>
      <br />
      <button
        onClick={() => {
          add();
          setRender(1);
        }}
      >
        add
      </button>
      <br />
      <div>
        {todos.map((todo) => (
          <div className="PresentationOfInformation" key={todo.id}>
            <ul>
              <li>{todo.id}</li>
              <li>{todo.title}</li>
              <li>{todo.completed.toString()}</li>
              <div className="checkbox">
                <input
                  onChange={() => {
                    changeTodoCompleted(todo);
                    setRender((prevRender) => prevRender + 1);
                  }}
                  type="checkbox"
                />
              </div>
              <Buttons
                userId={currentUser[1]}
                id={todo.id}
                setRender={setRender}
                render={render}
              />
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Todos;
