import React, { useCallback, useState } from "react";
import { Button, Form, Input, message, Select, Typography } from "antd";
import Dropzone, { useDropzone } from "react-dropzone";
import { DropzoneContainer, DropzoneInner } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { push } from "connected-react-router";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const privacyOption = [
  { value: 0, label: "public" },
  { value: 0, label: "private" },
];
const categoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().max(50).required("Title is required"),
  description: Yup.string().required("Description is required"),
  privacy: Yup.string(),
  category: Yup.string(),
  duration: Yup.string().required("Duration is required"),
  filePath: Yup.string().required("Video is required"),
  thumbnail: Yup.string().required("Thumbnail is required"),
});

function VideoUploadPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        privacy: "",
        category: categoryOption[0].label,
        filePath: "",
        thumbnail: "",
        duration: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        let body = {
          title: values.title,
          description: values.description,
          privacy: values.privacy === "public" ? 0 : 1,
          category: values.category,
          writer: user.userData._id,
          filePath: values.filePath,
          thumbnail: values.thumbnail,
          duration: values.duration,
        };
        console.log(body);
        axios.post("/api/video/uploadVideo", body).then((response) => {
          if (response.data.success) {
            message.success("성공적으로 업로드를 했습니다.");
            dispatch(push("/"));
          } else {
            alert("비디오 업로드를 실패했습니다.");
          }
        });
        setSubmitting(false);
      }}
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
          setFieldValue,
        } = props;

        const onDrop = (files: any) => {
          let formData = new FormData();
          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          formData.append("file", files[0]);
          axios
            .post("/api/video/uploadfiles", formData, config)
            .then((response) => {
              if (response.data.success) {
                setFieldValue("filePath", response.data.url, true);
                console.log(values.filePath);
                let body = {
                  url: response.data.url,
                  fileName: response.data.fileName,
                };
                axios.post("/api/video/thumbnail", body).then((response) => {
                  if (response.data.success) {
                    setFieldValue("thumbnail", response.data.url[0], true);
                    setFieldValue("duration", response.data.fileDuration, true);
                  } else {
                    alert("썸네일 생성을 실패했습니다.");
                  }
                });
              } else {
                alert("비디오 업로드를 실패했습니다.");
              }
            });
        };
        return (
          <>
            <Title level={2}>Upload Video</Title>
            <br />

            {/* thumbnail */}

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
                        <input {...getInputProps()} name="filePath" />
                        <PlusOutlined style={{ fontSize: "3rem" }} />
                      </DropzoneInner>
                    )}
                  </Dropzone>
                </Form.Item>
                <div style={{ width: "320px" }}>
                  {values.thumbnail !== "" && (
                    <img
                      src={`http://localhost:5000/${values.thumbnail}`}
                      alt={values.thumbnail}
                    />
                  )}
                </div>
              </DropzoneContainer>
              {errors.filePath && touched.filePath && (
                <div className="input-feedback">{errors.filePath}</div>
              )}
              {errors.thumbnail && touched.thumbnail && (
                <div className="input-feedback">{errors.thumbnail}</div>
              )}
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
                <Select
                  value={values.privacy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {privacyOption.map((item, index) => (
                    <Option key={index} value={item.label}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item required>
                <label>Category</label>
                <Select
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {categoryOption.map((item, index) => (
                    <Option key={index} value={item.label}>
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
