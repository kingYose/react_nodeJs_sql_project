import React from "react";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Buttons(props) {
  const { currentUser } = useContext(UserContext);

  function deleteTodo() {
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/toDos/delete/${props.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function toApDateTitel() {
    let content = prompt();
    if (content == null) {
      alert("Please enter a titel");
      {
        return;
      }
    }
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/toDos/updateTitle/${props.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: currentUser[1],
          title: content,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function getTrueTodos() {
    fetch(`http://localhost:4080/api/users/${currentUser[1]}/getTrue`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function getFalseTodos() {
    fetch(`http://localhost:4080/api/users/${currentUser[1]}/getFalse`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <div>
      <button
        onClick={() => {
          toApDateTitel();
          props.setRender(props.render + 1);
        }}
      >
        update
      </button>
      <button
        onClick={() => {
          deleteTodo();
          props.setRender(props.render + 1);
        }}
      >
        delete
      </button>
    </div>
  );
}
