import './App.css'
import { useState, useEffect, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import Login from './pages/Login';
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Posts from "./pages/Posts";
import Error from "./pages/Error";


import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const UserContext = createContext({
  currentUser: [],
  setCurrentUser: () => [],
});
function App() {
  const [currentUser, setCurrentUser] = useState([]);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <nav>
          <h3>Hello</h3>
          <h3>{currentUser[0]}</h3>
        </nav>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='User/Home/' element={<Home />} >  </Route>
          <Route path='User/Home/Todos' element={<Todos />}>  </Route>
          {/* <Route path='User/Home/Albums' element={<Albums />}>   </Route> */}
          <Route path='User/Home/Posts' element={<Posts />}>  </Route>
          {/* <Route path='User/Home/album/:albumId' element={<Photos />}>   </Route> */}
          <Route path='*' element={<Error />}>  </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
export default App;