import { useAppDispatch, useAppSelector } from "@store/hooks";
import { commentSlice } from "@_reducers/commentSlice";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useParams } from "react-router";
import * as Yup from "yup";

const { TextArea } = Input;

interface IReplyForm {
  second: boolean;
  commentId?: string;
  closeForm?: () => void;
}
function ReplyForm({ second, commentId, closeForm }: IReplyForm) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { videoId } = useParams<{ videoId: string }>();

  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={Yup.object().shape({
        comment: Yup.string().required("comment is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        let body = {
          writer: user.userData._id,
          videoId: videoId,
          content: values.comment,
          responseTo: second ? commentId : null,
        };
        axios.post("/api/comment/saveComment", body).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            dispatch(commentSlice.actions.addComment(response.data.comment));
            if (second && closeForm !== undefined) {
              closeForm();
            }
          } else {
            alert("댓글작성하는데 실패했습니다.");
          }
        });
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

              <Button style={{ height: "100%" }} htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ReplyForm;
