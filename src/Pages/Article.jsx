import React, { useEffect, useState, useRef } from "react";
import "./Article.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import storage from "../appwrite/storage";
import Post from "../appwrite/post";
import { useSelector } from "react-redux";

const Article = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const [data, setData] = useState("");

  async function getData() {
    const reply = await Post.getPost(id);
    setData(reply);
  }

  async function deletePost() {
    const reply = await Post.deletePost(id);

    const file = await storage.deleteFile(data.featuredImage);

    if (file) {
      navigate("/home");
    }
  }
  function updatePost() {
    navigate(`/edit-post/${id}`);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="article">
        <div className="display">
          {data?.featuredImage && (
            <img
              width="100%"
              height="100%"
              src={storage.filePreview(data.featuredImage)}
              alt="image"
            />
          )}
          <h1>{data?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
        </div>
      </div>
      {userData?.$id === data.userid ? (
        <div className="buttons">
          <button onClick={deletePost}>Delete</button>
          <button onClick={updatePost}>Update</button>
        </div>
      ) : null}
    </>
  );
};

export default Article;
