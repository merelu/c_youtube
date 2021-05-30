import React from "react";
import { IComment } from "@typings/db";
import SingleComment from "@components/SingleComment";
import ReplyForm from "@components/ReplyForm";
import ReplyComment from "@components/ReplyComment";

interface IComments {
  comments: IComment[];
}

function CommentList({ comments }: IComments) {
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
                <ReplyComment
                  comments={comments}
                  parentCommentId={comment._id}
                />
              </div>
            )
        )}

      <ReplyForm second={false} />
    </div>
  );
}

export default CommentList;
