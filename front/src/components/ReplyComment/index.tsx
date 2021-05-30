import SingleComment from "@components/SingleComment";
import { IComment } from "@typings/db";
import React, { useCallback, useEffect, useState } from "react";

interface IReplyComment {
  comments: IComment[];
  parentCommentId: string;
}
function ReplyComment({ comments, parentCommentId }: IReplyComment) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);
  const onClickOpenReplyComments = useCallback(() => {
    setOpenReplyComments((prev) => !prev);
  }, []);
  useEffect(() => {
    let commentNumber = 0;

    comments.forEach((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber((prev) => commentNumber);
  }, [comments, parentCommentId]);

  const renderReplyComment = (parentCommentId: string) =>
    comments.map((comment) => (
      <div key={comment._id}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment key={comment._id} comment={comment} />
            <ReplyComment
              key={comment._id + "1"}
              comments={comments}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            color: "gray",
            cursor: "pointer",
          }}
          onClick={onClickOpenReplyComments}
        >
          {`View ${childCommentNumber} more comment(s)`}
        </p>
      )}

      {openReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
