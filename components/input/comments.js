import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comment/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setComments(data.comments)
      });
    }
  }, [showComments, eventId])

  function addCommentHandler(commentData) {
    // send data to API
    commentData.eventId = eventId;
    fetch(`/api/comment/${eventId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments}/>}
    </section>
  );
}

export default Comments;
