import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import post from "../appwrite/post";
import PostForm from "../components/PostForm/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  async function getData() {
    const reply = await post.getPost(id);
    if (reply) {
      setData(reply);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PostForm post={data} />
    </>
  );
};

export default EditPost;
