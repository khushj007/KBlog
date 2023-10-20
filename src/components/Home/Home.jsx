import "./Home.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import post from "../../appwrite/post";
import { useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userdata = useSelector((state) => state.auth.userData);

  useEffect(() => {
    setPosts([]);
    post.getPosts().then((reply) => {
      reply.documents.forEach((element) => {
        if (element.userid === userdata.$id) {
          setPosts((prev) => {
            return [...prev, { ...element }];
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Header />

      <div className="home">
        <div className="posts">
          <h1>Your Posts</h1>
          <div className="pc">
            {posts.length > 0 ? (
              posts.map((data) => {
                return <PostCard key={data.userid} props={{ ...data }} />;
              })
            ) : (
              <p>No Post Create Yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
