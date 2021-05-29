import { IComment } from "@typings/db";
import { Avatar, Button, Comment, Form, Input } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const { TextArea } = Input;
interface ICustomComment {
  children?: React.ReactChild | React.ReactChild[];
}

const CustomComment = ({ children }: ICustomComment) => {
  return (
    <Comment
      actions={[]}
      author={<Link to={`/post`}>황규하</Link>}
      avatar={<Avatar src={"asdf"} alt={"asdf"} />}
      content={<p>asdf</p>}
    >
      {children}
    </Comment>
  );
};

interface IComments {
  comments: IComment[];
}

function Comments({ comments }: IComments) {
  const { videoId } = useParams<{ videoId: string }>();
  // const mapedComments = comments.map((comment, index) => {

  // });
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}
      <Formik
        initialValues={{ comment: "" }}
        validationSchema={Yup.object().shape({
          comment: Yup.string().required("comment is required"),
        })}
        onSubmit={() => {}}
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
          } = props;
          return (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onFinish={handleSubmit}
            >
              {errors.comment && touched.comment && (
                <div className="input-feedback">{errors.comment}</div>
              )}
              <div style={{ display: "flex", height: "60px" }}>
                <TextArea
                  style={{ resize: "none" }}
                  id="comment"
                  placeholder="Enter your Comment"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Button style={{ height: "100%" }}>Submit</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Comments;
