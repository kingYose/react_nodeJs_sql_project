import React from "react";
import { Link } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Home from "./Home";
import ReactDOM from "react-dom/client";
import { UserContext } from "../App";
import axios from "axios";

function Login() {
  const [userName1, setuserName1] = useState();
  const [password1, setpassword1] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    firstName: yup.string().required("You have to write something!"),
    password: yup.string().required("Minimum 4 characters "),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const {
    onChange: onChangeRegisterName,
    onBlur,
    name,
    ref,
  } = register("firstName");

  const {
    onChange: onChangeRegisterPass,
    onBlur: onBlurRegisterPass,
    name: nameRegisterPass,
    ref: refRegisterPass,
  } = register("password");

  function onChangeUserName(e) {
    onChangeRegisterName(e);
    setuserName1(e.target.value);
  }

  function onChangePassword(e) {
    onChangeRegisterPass(e);
    setpassword1(e.target.value);
  }

  const onSubmitHadler = async (event) => {
    try {
      const { data } = await axios.post(`http://localhost:4080/login/`, {
        username: userName1,
        password: password1,
      });
      const arrCurrentUser = {
        username: userName1,
        password: password1,
        id: data.userId,
      };

      setCurrentUser(arrCurrentUser);
      localStorage.setItem("currentUserIn", JSON.stringify(arrCurrentUser));
      const id = parseInt(currentUser.id);
      navigate(`User/${id}/Home/`);
    } catch (err) {
      alert("user not exist");
    }
  };

  return (
    <section>
      <h1>Welcome</h1>
      <h3>Enter your details</h3>
      <div className="divForm">
        <form onSubmit={handleSubmit(onSubmitHadler)}>
          <label htmlFor="firstName"></label>
          <input
            onChange={onChangeUserName}
            type="text"
            id="firstName"
            placeholder="userName"
            onBlur={onBlur}
            name={name}
            ref={ref}
            // {...register("firstName")}
          ></input>

          <p>{errors.firstName?.message}</p>

          <br />

          <label htmlFor="password"> </label>
          <input
            onChange={onChangePassword}
            type="password"
            id="password"
            placeholder="password"
            onBlur={onBlurRegisterPass}
            name={nameRegisterPass}
            ref={refRegisterPass}
            // {...register("password")}
          ></input>

          <p>{errors.confirmPassword?.message}</p>

          <br />

          <button id="buttonsubmit" type="submit" className="buttonSubmit">
            שלח
          </button>
        </form>
      </div>
    </section>
  );
}
export default Login;
