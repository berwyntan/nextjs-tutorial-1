import classes from "./comment-list.module.css";

function CommentList(props) {
  const { comments } = props;
  
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comment) => {
        return (
          <li key={comment.text}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;