import React from 'react'

export default function Sorting(props) {


    function SortingTrueVal(){
      
        const  filteredTodos = props.todos.filter((todo)=>todo.completed===true);
        props.UpdateInformation(filteredTodos);
        props.setTodosFilter(filteredTodos);
        props.setRenderFilter(props.renderFilter+1)
      
        
    }
    function SortingFalseVal(){
        const  filteredTodos = props.todos.filter((todo)=>todo.completed===false);
        props.UpdateInformation(filteredTodos);
        props.setTodosFilter(filteredTodos);
        props.setRenderFilter(props.renderFilter+1)
       
    }

    function SortingTitleVal() {
    const inputText = prompt("Enter title");   
    if (inputText === null) {
        return; 
    }

    const filteredTodos = props.todos.filter((todo) =>
        todo.title.toLowerCase().includes(inputText.toLowerCase())
    );

    props.UpdateInformation(filteredTodos);
    props.setTodosFilter(filteredTodos);
    props.setRenderFilter(props.renderFilter + 1);
    }

  return (
    <div>
        <button onClick={SortingTrueVal}> Search by true</button>
        <button onClick={SortingFalseVal}> Search by false</button>
        <button onClick={SortingTitleVal}> Search by title</button>
       


    </div>
  )
}
