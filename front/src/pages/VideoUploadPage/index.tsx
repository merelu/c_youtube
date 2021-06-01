import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Typography } from "antd";
import Dropzone from "react-dropzone";
import { DropzoneContainer, DropzoneInner } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import { Formik, FormikValues, useFormikContext } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { push } from "connected-react-router";
import { IVideo } from "@typings/db";

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

interface IFormikValues {
  title: string;
  description: string;
  privacy: string;
  category: string;
  filePath: string;
  thumbnail: string;
  duration: string;
}

const SubPage = () => {
  const { values } = useFormikContext<IFormikValues>();
  useEffect(() => {
    if (values.filePath !== "" && values.thumbnail !== "") {
      return () => {
        let body = { filePath: values.filePath, thumbnail: values.thumbnail };

        axios.post(`/api/video/uploadVideoDelete`, body).then((response) => {
          if (!response.data.success) {
            alert("비디오 삭제 실패");
          }
        });
      };
    }
  }, [values.filePath, values.thumbnail]);
  return null;
};
function VideoUploadPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const initialvalues: IFormikValues = {
    title: "",
    description: "",
    privacy: privacyOption[0].label,
    category: categoryOption[0].label,
    filePath: "",
    thumbnail: "",
    duration: "",
  };
  return (
    <Formik
      initialValues={initialvalues}
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
        axios.post("/api/video/uploadVideo", body).then((response) => {
          if (response.data.success) {
            dispatch(push("/myVideo"));
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
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        } = props;

        const renderThumbnail = () => {
          if (values.thumbnail !== "" && !loading) {
            return (
              <img
                src={`http://localhost:5000/${values.thumbnail}`}
                alt={values.thumbnail}
              />
            );
          } else if (loading) {
            return <div>...loading</div>;
          } else {
            return <div></div>;
          }
        };

        const onDrop = (files: any) => {
          let formData = new FormData();
          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          setLoading(true);
          formData.append("file", files[0]);
          axios
            .post("/api/video/uploadfiles", formData, config)
            .then((response) => {
              if (response.data.success) {
                setFieldValue("filePath", response.data.url, true);
                let body = {
                  url: response.data.url,
                  fileName: response.data.fileName,
                };
                axios.post("/api/video/thumbnail", body).then((response) => {
                  if (response.data.success) {
                    setFieldValue("thumbnail", response.data.url[0], true);
                    setFieldValue("duration", response.data.fileDuration, true);
                    setLoading(false);
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
          <div className="formPage">
            <SubPage />
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
                <div
                  style={{
                    display: "flex",
                    width: "320px",
                    height: "240px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {renderThumbnail()}
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
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default VideoUploadPage;
