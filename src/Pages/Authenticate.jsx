import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authenticate = ({ children }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.$id) {
      navigate(`/`);
    }
  }, []);

  return <>{userData?.$id ? children : null}</>;
};

export default Authenticate;
