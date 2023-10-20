import React, { useState } from "react";
import "./SignUpForm.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      setError("");

      const reply = await authService.createAccount(data);
      console.log(reply);
      if (reply) {
        dispatch(login(reply));
        navigate("/home");
      }
    } catch (e) {
      console.log(`e`, e);
      setError(e.message);
    }
  };

  return (
    <div className="signupform">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>SIGN UP</h1>
        <input
          placeholder="Name"
          type="text"
          {...register("name", { required: true })}
        />
        <input
          placeholder="email"
          type="text"
          {...register("email", { required: true })}
        />
        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
        <button>Sign Up</button>
      </form>

      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default SignUpForm;
