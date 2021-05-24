import { useAppDispatch } from "@store/hooks";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import gravatar from "gravatar";
import { registerUser } from "@_actions/user_action";
import { push } from "connected-react-router";
import Title from "antd/lib/typography/Title";
import { Button, Input, Form } from "antd";
import { ErrorText } from "@pages/LoginPage/styles";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage() {
  const dispatch = useAppDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(5, "Password must be at least 5 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("제출!");
        let body = {
          email: values.email,
          password: values.password,
          name: values.name,
          image: gravatar.url(values.email, { s: "28px", d: "retro" }),
        };

        dispatch(registerUser(body))
          .then((response) => {
            if (response.payload.success) {
              dispatch(push("/login"));
            }
          })
          .catch((err) => {
            setFormErrorMessage("Check out your Email");
            setTimeout(() => {
              setFormErrorMessage("");
            }, 3000);
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
        } = props;
        return (
          <>
            <Title level={2}>Sign up</Title>
            <Form
              onFinish={handleSubmit}
              {...formItemLayout}
              style={{ minWidth: "375px" }}
            >
              <Form.Item required label="Email">
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>
              <Form.Item required label="Password">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>
              <Form.Item required label="Confirm ">
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirm password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>
              {formErrorMessage && (
                <label>
                  <ErrorText>{formErrorMessage}</ErrorText>
                </label>
              )}
              <Form.Item {...tailFormItemLayout}>
                <Button
                  htmlType="submit"
                  onSubmit={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
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

export default RegisterPage;
