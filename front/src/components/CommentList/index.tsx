import React from "react";
import SingleComment from "@components/SingleComment";
import ReplyForm from "@components/ReplyForm";
import ReplyComment from "@components/ReplyComment";
import { useAppSelector } from "@store/hooks";

function CommentList() {
  const comments = useAppSelector((state) => state.comments);
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}
      {comments &&
        comments.map(
          (comment) =>
            !comment.responseTo && (
              <div key={comment._id}>
                <SingleComment comment={comment} />
                <ReplyComment parentCommentId={comment._id} />
              </div>
            )
        )}

      <ReplyForm second={false} />
    </div>
  );
}

export default CommentList;
