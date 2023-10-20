import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Client, Account } from "appwrite";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import RTE from "./components/RTE/RTE";
import PostForm from "./components/PostForm/PostForm";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";
import AllPosts from "./components/AllPosts/AllPosts";
import Article from "./Pages/Article";
import EditPost from "./Pages/EditPost";
import Authenticate from "./Pages/Authenticate";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/addpost"
          element={
            <Authenticate>
              <PostForm />
            </Authenticate>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Welcome />} />
        <Route
          path="/home"
          element={
            <Authenticate>
              <Home />
            </Authenticate>
          }
        />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/post/:id" element={<Article />} />
        <Route
          path="/edit-post/:id"
          element={
            <Authenticate>
              <EditPost />
            </Authenticate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
