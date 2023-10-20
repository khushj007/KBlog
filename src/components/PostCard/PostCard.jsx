import "./PostCard.css";
import { Link } from "react-router-dom";
import storage from "../../appwrite/storage";
const PostCard = ({ props }) => {
  const { $id, title, featuredImage } = props;
  console.log(`inside postform`, $id, title, featuredImage);

  return (
    <>
      <Link style={{ textDecoration: `none` }} to={`/post/${$id}`}>
        <div className="postCard">
          <img
            width="100%"
            height="100%"
            src={storage.filePreview(featuredImage)}
            alt={$id}
          />
          <h2>{title}</h2>
        </div>
      </Link>
    </>
  );
};

export default PostCard;
