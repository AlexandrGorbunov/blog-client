import {format} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,cover,content,createdAt,author}) {

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'https://blog-app-1jc3.onrender.com/'+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <div className="author">{author.username}</div>
					<time>{format(new Date(createdAt), 'd MMM yyyy, HH:mm')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}