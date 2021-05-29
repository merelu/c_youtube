import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Typography, Card, Avatar } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { IVideo } from "@typings/db";
import { Link } from "react-router-dom";
import {
  Duration,
  MainContainer,
  ThumbnailImg,
  ItemContainer,
} from "@pages/LandingPage/styles";

const { Title } = Typography;
const { Meta } = Card;
dayjs.extend(advancedFormat);

function SubscriptionPage() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    axios
      .get(
        `/api/video/getSubscriptionVideos/${window.localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.videos);
          setVideos(response.data.videos);
        } else {
          alert("비디오 가져오기를 실패 했습니다.");
        }
      });
  }, []);

  const renderCards = videos.map((video, index) => {
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
      </Col>
    );
  });

  return (
    <MainContainer>
      <Title level={2}>Recommended</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </MainContainer>
  );
}

export default SubscriptionPage;
