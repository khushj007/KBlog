import React, { useEffect, useState } from "react";
import "./AllPosts.css";
import post from "../../appwrite/post";
import PostCard from "../PostCard/PostCard";
import Header from "../Header/Header";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    post.getPosts().then((reply) => {
      setPosts(reply.documents);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="allposts">
        {posts.map((post) => {
          return <PostCard key={post.userid} props={{ ...post }} />;
        })}
      </div>
      ;
    </>
  );
};

export default AllPosts;
