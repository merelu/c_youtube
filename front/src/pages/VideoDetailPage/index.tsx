import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { CVideo, VideoContainer } from "./styles";
import axios from "axios";
import { useParams } from "react-router";
import { IVideo } from "@typings/db";
import SideVideo from "@components/SideVideo";
import Subscribe from "@components/Subscribe";
import CommentList from "@components/CommentList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { commentSlice } from "@_reducers/commentSlice";
import LikeDisLikes from "@components/LikeDisLikes";

function VideoDetailPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { videoId } = useParams<{ videoId: string }>();
  const [videoDetail, setVideoDetail] = useState<IVideo>();

  useEffect(() => {
    axios.get(`/api/video/getVideoDetail/${videoId}`).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를를 가져 오는 것을 실패했습니다.");
      }
    });

    axios.get(`/api/comment/getComments/${videoId}`).then((response) => {
      if (response.data.success) {
        dispatch(commentSlice.actions.fetchComment(response.data.comments));
      } else {
        alert("해당 비디오의 댓글을 불러오는데 실패했습니다.");
      }
    });
  }, [dispatch, videoId]);

  if (videoDetail) {
    const actions =
      videoDetail.writer._id !== user.userData._id
        ? [
            <LikeDisLikes type="video" />,
            <Subscribe userTo={videoDetail?.writer._id} />,
          ]
        : [];

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <VideoContainer>
            <CVideo
              src={
                videoDetail && `http://localhost:5000/${videoDetail?.filePath}`
              }
              controls
            />

            <List.Item actions={actions}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail?.writer.image} />}
                title={videoDetail?.writer.name}
                description={videoDetail?.description}
              />
            </List.Item>
            <CommentList />
          </VideoContainer>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loading</div>;
  }
}

export default VideoDetailPage;
