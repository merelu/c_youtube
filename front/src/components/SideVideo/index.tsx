import { ThumbnailImg } from "@pages/LandingPage/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SideVideoContainer,
  SideVideoThumbnailWrap,
  SideVideoInfoWrap,
  WriterName,
} from "./styles";
import axios from "axios";
import { IVideo } from "@typings/db";

function SideVideo() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("비디오 가져오기를 실패 했습니다.");
      }
    });
  }, []);
  const renderSideVideo = videos.map((video, index) => {
    let minutes = Math.floor(parseInt(video.duration) / 60);
    let seconds = Math.floor(parseInt(video.duration) - minutes * 60);

    return (
      <SideVideoContainer key={index}>
        <SideVideoThumbnailWrap>
          <Link to={`/video/${video._id}`}>
            <ThumbnailImg src={`http://localhost:5000/${video.thumbnail}`} />
          </Link>
        </SideVideoThumbnailWrap>
        <SideVideoInfoWrap>
          <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
            <WriterName>{video.writer.name}</WriterName>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
          </Link>
        </SideVideoInfoWrap>
      </SideVideoContainer>
    );
  });
  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }}>{renderSideVideo}</div>
    </React.Fragment>
  );
}

export default SideVideo;
