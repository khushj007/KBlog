import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome">
      <h1>Welcome to KBlogs</h1>
      <div>
        <Link to="/signup">
          {" "}
          <button style={{ background: `#d9534f` }}>SingUp</button>
        </Link>
        <Link to="/allposts">
          <button style={{ background: `#FFA500` }}>All Blogs</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
