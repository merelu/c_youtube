import React, { useCallback } from "react";
import { Button, Form, Input, Typography } from "antd";
import Dropzone from "react-dropzone";
import {
  DropzoneContainer,
  DropzoneInner,
  TitleWrap,
  VideoUploadFormContainer,
} from "./styles";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {
  const onSubmit = useCallback(() => {}, []);
  return (
    <div className="app">
      <VideoUploadFormContainer>
        <TitleWrap>
          <Title level={2}>Upload Video</Title>
        </TitleWrap>
        <Form onFinish={onSubmit}>
          <DropzoneContainer>
            {/* drop zone */}
            <Dropzone multiple>
              {({ getRootProps, getInputProps }) => (
                <DropzoneInner {...getRootProps()}>
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </DropzoneInner>
              )}
            </Dropzone>
            {/* thumbnail */}
            <div style={{ width: "300px" }}>
              <img src="" alt="" />
            </div>
          </DropzoneContainer>

          <br />
          <br />
          <label>Title</label>
          <Input />
          <br />
          <br />
          <label>Description</label>
          <TextArea></TextArea>
          <br />
          <br />
          <select>
            <option value=""></option>
          </select>
          <br />
          <br />
          <select>
            <option value=""></option>
          </select>
          <br />
          <br />
          <Button type="primary" size="large">
            Submit
          </Button>
        </Form>
      </VideoUploadFormContainer>
    </div>
  );
}

export default VideoUploadPage;
