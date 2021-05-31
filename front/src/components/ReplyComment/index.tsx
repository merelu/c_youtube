import SingleComment from "@components/SingleComment";
import { useAppSelector } from "@store/hooks";
import React, { useCallback, useEffect, useState } from "react";

interface IReplyComment {
  parentCommentId: string;
}
function ReplyComment({ parentCommentId }: IReplyComment) {
  const comments = useAppSelector((state) => state.comments);
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
          <div key={comment._id} style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment comment={comment} />
            <ReplyComment parentCommentId={comment._id} />
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
