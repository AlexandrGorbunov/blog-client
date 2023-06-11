import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog-9d1w.onrender.com/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  async function deletePost() {
    if (window.confirm('Вы действительно хотите удалить пост?')) {
      const response = await fetch(`https://blog-9d1w.onrender.com/post/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        alert('Статья успешно удалена.');
        navigate('/');
      } else {
        alert('Ошибка при удалении статьи.');
      }
    }
  }

  if (!postInfo) return null;

  const isUserLoggedIn = !!userInfo; 
  const isAuthor = userInfo && userInfo.id === postInfo.author._id; // Check if user is the author

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), 'd MMM yyyy, HH:mm')}</time>
      <div className="author">@{postInfo.author.username}</div>
      {isUserLoggedIn && isAuthor && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Редактировать</Link>
          <Link className="delete-btn" onClick={deletePost}>Удалить</Link>
        </div>
      )}
      <div className="image">
        <img src={`https://blog-9d1w.onrender.com/${postInfo.cover}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}

