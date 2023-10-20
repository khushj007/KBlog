import "./Header.css";
import LogoutandLogin from "../LogoutandLogin/LogoutandLogin";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/home" style={{ textDecoration: "none" }}>
        <h1>KBLOG</h1>
      </Link>

      <ul>
        <Link style={{ textDecoration: `none` }} to="/home">
          {" "}
          <li>Home</li>
        </Link>
        <Link style={{ textDecoration: `none` }} to="/allposts">
          <li>AllPosts</li>
        </Link>
        <Link style={{ textDecoration: `none` }} to="/addpost">
          <li>Add Post</li>
        </Link>
      </ul>

      <LogoutandLogin />
    </div>
  );
};

export default Header;
