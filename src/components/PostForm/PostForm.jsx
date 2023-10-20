import "./Postform.css";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import RTE from "../RTE/RTE";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import storage from "../../appwrite/storage";
import Post from "../../appwrite/post";
import Header from "../Header/Header";

const PostForm = ({ post }) => {
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    // if its an update request

    if (post) {
      console.log(post);
      const file = data.image[0] ? storage.uploadFile(data.image[0]) : null;

      if (file) {
        storage.deleteFile(post.featuredImage);
      }

      const dbPost = await Post.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }

    // if its an creation request
    else {
      const file = await storage.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        data.userid = userData.$id;

        const dbPost = await Post.createPost({
          ...data,
        });

        console.log(`dbPost`, dbPost);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <>
      <Header />

      <form className="addpost" onSubmit={handleSubmit(onSubmit)}>
        <h1>Post Form</h1>
        <input type="text" placeholder="title" {...register("title")} />
        <input type="slug" placeholder="slug" {...register("slug")} readOnly />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <label htmlFor="file">Provide Image For Blog </label>
        <input id="file" type="file" {...register("image")} />

        <button>Submit</button>
      </form>
    </>
  );
};

export default PostForm;
