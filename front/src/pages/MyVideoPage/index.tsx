import {
  Duration,
  ItemContainer,
  MainContainer,
  ThumbnailImg,
} from "@pages/LandingPage/styles";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Typography, Card, Avatar, Button } from "antd";
import { IVideo } from "@typings/db";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useAppSelector } from "@store/hooks";

const { Title } = Typography;
const { Meta } = Card;
function MyVideoPage() {
  const user = useAppSelector((state) => state.user);
  const [myVideos, setMyVideos] = useState<IVideo[]>([]);
  const onClickDeleteVideo = useCallback((videoId: string) => {
    axios.delete(`/api/video/deleteVideo/${videoId}`).then((response) => {
      if (response.data.success) {
        setMyVideos((prev) => prev.filter((item) => item._id !== videoId));
      } else {
        alert("비디오 삭제를 실패했습니다.");
      }
    });
  }, []);
  useEffect(() => {
    if (user.userData._id) {
      axios
        .get(`/api/video/getMyVideos/${user.userData._id}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setMyVideos(response.data.videos);
          } else {
            alert("비디오 가져오기를 실패 했습니다.");
          }
        });
    }
  }, [user.userData._id]);

  const renderCards = myVideos.map((video, index) => {
    let minutes = Math.floor(parseInt(video.duration) / 60);
    let seconds = Math.floor(parseInt(video.duration) - minutes * 60);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Link to={`/video/${video._id}`}>
          <ItemContainer>
            <ThumbnailImg
              src={`http://localhost:5000/${video.thumbnail}`}
              alt={video.thumbnail}
            />
            <Duration>
              <span>
                {minutes} : {seconds}
              </span>
            </Duration>
          </ItemContainer>
        </Link>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{video.views} views</span> -{" "}
        <span>{dayjs(video.createdAt).format("MMM Do YY")}</span>
        <br />
        <Button
          style={{ width: "100%" }}
          type="primary"
          danger
          onClick={() => onClickDeleteVideo(video._id)}
        >
          Delete
        </Button>
      </Col>
    );
  });

  return (
    <MainContainer>
      <Title level={2}>My Video</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </MainContainer>
  );
}

export default MyVideoPage;
