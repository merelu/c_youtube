import { Avatar, Comment } from "antd";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ReplyForm from "@components/ReplyForm";
import { IComment } from "@typings/db";

interface ISingleComment {
  comment: IComment;
}

function SingleComment({ comment }: ISingleComment) {
  const [openReply, setOpenReply] = useState(false);

  const onClickReplyOpen = useCallback(() => {
    setOpenReply((prev) => !prev);
  }, []);
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={<Link to={`#`}>{comment.writer.name}</Link>}
        avatar={
          <Avatar src={comment.writer.image} alt={comment.writer.image} />
        }
        content={<p>{comment.content}</p>}
      />
      {openReply && (
        <ReplyForm
          second={true}
          commentId={comment._id}
          closeForm={onClickReplyOpen}
        />
      )}
    </div>
  );
}

export default SingleComment;
