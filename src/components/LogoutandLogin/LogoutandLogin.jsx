import React from "react";
import "./LogoutandLogin.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const LogoutandLogin = (button) => {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const value = status ? `Logout` : `Login`;

  function handelClick(e) {
    if (status) {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <button onClick={handelClick} className={value}>
      {value}
    </button>
  );
};

export default LogoutandLogin;
