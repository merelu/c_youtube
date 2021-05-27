import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { CVideo, VideoContainer } from "./styles";
import axios from "axios";
import { useParams } from "react-router";
import { IVideo } from "@typings/db";
import SideVideo from "@components/SideVideo";

function VideoDetailPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoDetail, setVideoDetail] = useState<IVideo>();

  useEffect(() => {
    axios.get(`/api/video/getVideoDetail/${videoId}`).then((response) => {
      if (response.data.success) {
        console.log(response.data.videoDetail);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 정보를를 가져 오는 것을 실패했습니다.");
      }
    });
  }, [videoId]);
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

          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={videoDetail?.writer.image} />}
              title={videoDetail?.writer.name}
              description={videoDetail?.description}
            />
          </List.Item>
          {/* Comments */}
        </VideoContainer>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
