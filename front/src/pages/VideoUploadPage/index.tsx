import React, { useCallback, useState } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import Dropzone from "react-dropzone";
import { DropzoneContainer, DropzoneInner } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const privacyOption = [
  { value: 0, label: "public" },
  { value: 1, label: "private" },
];
const categoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

const validationSchema = Yup.object().shape({
  videoUrl: Yup.string().required("Video is required"),
  thumbnailUrl: Yup.string().required("Thumbnail is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  privacy: Yup.number().default(0),
  category: Yup.number().default(0),
});

function VideoUploadPage() {
  const [thumbnailPath, setThumbnailPath] = useState("");
  const onDrop = useCallback((files) => {
    let formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        let body = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        axios.post("/api/video/thumbnail", body).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setThumbnailPath(response.data.url[0]);
          } else {
            alert("썸네일 생성을 실패했습니다.");
          }
        });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  }, []);

  return (
    <Formik
      initialValues={{
        videoUrl: "",
        thumbnailUrl: "",
        title: "",
        description: "",
        privacy: 0,
        category: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {}}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        return (
          <>
            <Title level={2}>Upload Video</Title>
            <br />
            <Form onFinish={handleSubmit}>
              <DropzoneContainer>
                {/* drop zone */}
                <Form.Item required>
                  <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000000}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <DropzoneInner {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: "3rem" }} />
                      </DropzoneInner>
                    )}
                  </Dropzone>
                </Form.Item>
                {/* thumbnail */}
                <Form.Item required>
                  <div style={{ width: "320px" }}>
                    {thumbnailPath && (
                      <img
                        src={`http://localhost:5000/${thumbnailPath}`}
                        alt=""
                      />
                    )}
                  </div>
                </Form.Item>
              </DropzoneContainer>

              <Form.Item required>
                <label>Title</label>
                <Input
                  id="title"
                  placeholder="Enter title"
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.title && touched.title
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.title && touched.title && (
                  <div className="input-feedback">{errors.title}</div>
                )}
              </Form.Item>
              <Form.Item required>
                <label>Description</label>
                <TextArea
                  id="description"
                  placeholder="Enter description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.description && touched.description
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.description && touched.description && (
                  <div className="input-feedback">{errors.description}</div>
                )}
              </Form.Item>
              <Form.Item required>
                <label>Privacy</label>
                <Select defaultValue={0}>
                  {privacyOption.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item required>
                <label>Category</label>
                <Select defaultValue={0}>
                  {categoryOption.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default VideoUploadPage;
