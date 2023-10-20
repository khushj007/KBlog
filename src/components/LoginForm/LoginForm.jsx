import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";
import { useState } from "react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async ({ email, password }) => {
    setError("");

    try {
      const reply = await authService.Login({ email, password });

      if (reply) {
        const data = await authService.getCurrentUser();
        dispatch(login(data));
        navigate("/home");
      }
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="loginform">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <input
          type="text"
          {...register("email", {
            required: true,
            minLength: 5,
          })}
          placeholder="email"
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        <button>LOGIN</button>
      </form>

      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default LoginForm;
