import { Tooltip } from "antd";
import React, {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router";
import { useAppSelector } from "@store/hooks";
import { IComment } from "@typings/db";

type action = "liked" | "disliked" | null;
type ContentType =
  | { type: "video"; comment?: never }
  | { type: "comment"; comment: IComment };
interface CommonProps {}

type props = CommonProps & ContentType;

function LikeDisLikes({ type, comment }: props) {
  const { videoId } = useParams<{ videoId: string }>();
  const user = useAppSelector((state) => state.user);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [likeAction, setLikeAction] = useState<action>(null);
  let body = useMemo(() => {
    if (type === "video") {
      return { videoId: videoId, userId: user.userData._id };
    } else {
      return { commentId: comment?._id, userId: user.userData._id };
    }
  }, [comment?._id, type, user.userData._id, videoId]);

  const onLike = useCallback(() => {
    if (likeAction === null || likeAction === "disliked") {
      axios.post("/api/like/uplike", body).then((response) => {
        if (response.data.success) {
          setLikes((prev) => prev + 1);
          if (likeAction === "disliked") {
            setDislikes((prev) => prev - 1);
          }
          setLikeAction((prev) => "liked");
        } else {
          alert("좋아요 하는데 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/like/unlike", body).then((response) => {
        if (response.data.success) {
          setLikes((prev) => prev - 1);
          setLikeAction((prev) => null);
        } else {
          alert("unlike 실패했습니다.");
        }
      });
    }
  }, [body, likeAction]);

  const onDislike = useCallback(() => {
    if (likeAction === null || likeAction === "liked") {
      axios.post("/api/like/upDislike", body).then((response) => {
        if (response.data.success) {
          setDislikes((prev) => prev + 1);
          if (likeAction === "liked") {
            setLikes((prev) => prev - 1);
          }
          setLikeAction((prev) => "disliked");
        } else {
          alert("싫어요 하는데 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/like/unDislike", body).then((response) => {
        if (response.data.success) {
          setDislikes((prev) => prev - 1);
          setLikeAction((prev) => null);
        } else {
          alert("undislike 실패했습니다.");
        }
      });
    }
  }, [body, likeAction]);

  useEffect(() => {
    axios.post("/api/like/getLikes", body).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        //내가 이미 그 좋아요를 눌렀는지
        setLikes((prev) => response.data.likes.length);

        response.data.likes.forEach((like: any) => {
          if (like.userId === user.userData._id) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("좋아요 정보를 가져오는데 실패했습니다.");
      }
    });

    axios.post("/api/like/getDislikes", body).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        //내가 이미 그 좋아요를 눌렀는지
        setDislikes((prev) => response.data.dislikes.length);

        response.data.dislikes.forEach((dislike: any) => {
          if (dislike.userId === user.userData._id) {
            setLikeAction("disliked");
          }
        });
      } else {
        alert("싫어요 정보를 가져오는데 실패했습니다.");
      }
    });
  }, [body, comment, type, user.userData._id, videoId]);

  return (
    <div>
      <Tooltip key="comment-basic-like" title="Like">
        <span style={{ cursor: "pointer" }} onClick={onLike}>
          {createElement(likeAction === "liked" ? LikeFilled : LikeOutlined)}
        </span>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </Tooltip>
      <Tooltip key="comment-basic-dislike" title="DisLike">
        <span
          style={{ paddingLeft: "8px", cursor: "pointer" }}
          onClick={onDislike}
        >
          {createElement(
            likeAction === "disliked" ? DislikeFilled : DislikeOutlined
          )}
        </span>
        <span style={{ padding: "0 8px", cursor: "pointer" }}>{dislikes}</span>
      </Tooltip>
    </div>
  );
}

export default LikeDisLikes;
