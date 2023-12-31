import React from "react";
import { UserContext } from '../App';
import   {  useContext } from 'react';

export default function Buttons(props) {

  const { currentUser } = useContext(UserContext);
  
  function deleteTodo() {
    fetch( `http://localhost:3005/todos/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
 function toApDate(){
  let content=prompt();
    if (content==null){
      alert("Please enter a date")
     {return}}
    fetch(`http://localhost:3005/Todos/${props.id}`, {
      method: "PUT",
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

  return (
    <div>
      <button onClick={() => {
         toApDate ();
        props.setRender  (props.render+1);
        }}>update</button>
      <button onClick={() => {
         deleteTodo ();
        props.setRender(props.render+1);
        }}>delete</button>
      
    </div>
  );
}
