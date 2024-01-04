import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Buttons from "./buttons";
import Sorting from "./sorting";
import { useNavigate } from "react-router-dom";

function Todos() {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render, setRender] = useState(0);
  const [renderFilter, setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);
  const navigate = useNavigate();

  const chekUserIn = () => {
    const data = localStorage.getItem("currentUserIn");
    if (!data) {
      navigate("/");
      return;
    }
  };
  chekUserIn();

  const id = parseInt(currentUser.id);
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem("currentUserIn")
  );

  useEffect(() => {
    try {
      const fetchTodos = async () => {
        console.log(currentUser);
        const response = await fetch(
          `http://localhost:4080/api/users/${id}/toDos/get`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              auth: `${currentUser.username}:${currentUser.password}`,
            },
          }
        );

        const [json] = await response.json();
        setTodos(json);
      };

      // setJson(json);

      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  }, [render]);

  useEffect(() => {
    setTodos(todosFilter);
  }, [renderFilter]);

  function add() {
    try {
      // (function () {
      //   setRender(render + 1);
      // })();
      let content = prompt();
      if (content == null) {
        return;
      }
      fetch(`http://localhost:4080/api/users/${currentUser}/toDos/add`, {
        method: "POST",
        body: JSON.stringify({
          userId: currentUser.id,
          title: content,
          completed: 0,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          auth: `${currentUser.username}:${currentUser.password}:${currentUser.id}`,
        },
      }).then(() => setRender(render + 1));
    } catch (err) {
      alert(err);
    }
  }

  function changeTodoCompleted(oneTodo) {
    const changeCompleted = !oneTodo.completed;
    // oneTodo.completed == 1
    //   ? changeTodoCompleted == 0
    //   : changeTodoCompleted == 1;
    const saveTitle = oneTodo.title;
    fetch(
      `http://localhost:4080/api/users/${currentUser.id}/toDos/updateComplet/${oneTodo.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          todoId: oneTodo.id,
          userId: currentUser.id,
          title: saveTitle,
          completed: changeCompleted,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          auth: `${dataFromLocalStorage.username}:${dataFromLocalStorage.password}`,
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
      <div className="butLinkToHome">
        {/* {navigate("/User/1/Home/")} */}
        <Link to={`/User/${currentUser.id}/Home/`}>Home</Link>
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
        className="buttonForEverdiv"
        onClick={() => {
          add();
          setRender(render + 1);
        }}
      >
        add
      </button>
      <br />
      <div>
        {todos.map((todo) => (
          <div className="PresentationOfInformation" key={todo.id}>
            <ul>
              <br />
              <li>{todo.id}</li>
              <li>{todo.title}</li>
              <li> {"status is: " + todo.completed}</li>
              <div className="checkbox">
                <input
                  onChange={() => {
                    changeTodoCompleted(todo);
                    setRender((prevRender) => prevRender + 1);
                  }}
                  type="checkbox"
                  style={todo.completed == 0 ? { visibility: "hidden" } : null}
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
