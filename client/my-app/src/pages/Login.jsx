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

function Login() {
  const { setCurrentUser, currentUser } = useContext(UserContext);
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

  const onSubmitHadler = async (event) => {
    let userName1 = document.getElementById("firstName").value;
    let password1 = document.getElementById("password").value;
    const user = await fetch(
      `http://localhost:3005/users?username=${userName1}&website=${password1}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.length !== 0) {
          setCurrentUser([userName1, json[0].id]);
          navigate("User/Home");
        } else {
          alert("user not exist");
        }
      });
  };

  return (
    <section>
      <h1>Welcome</h1>
      <h3>Enter your details</h3>
      <div className="divForm">
        <form onSubmit={handleSubmit(onSubmitHadler)}>
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            placeholder="userName"
            {...register("firstName")}
          ></input>
          <p>{errors.firstName?.message}</p>

          <br />

          <label htmlFor="password"> </label>
          <input
            type="text"
            id="password"
            placeholder="password"
            {...register("password")}
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
