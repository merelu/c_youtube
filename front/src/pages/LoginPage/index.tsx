import React, { useCallback, useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { logInUser } from "@_actions/user_action";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { push } from "connected-react-router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrorText } from "./styles";
import { Link } from "react-router-dom";

const { Title } = Typography;

function LoginPage() {
  const dispatch = useAppDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const handleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe") || ""
    : "";

  return (
    <Formik
      initialValues={{ email: initialEmail, password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(5, "Password must be at least 5 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        let body = {
          email: values.email,
          password: values.password,
        };

        dispatch(logInUser(body))
          .then((response) => {
            if (response.payload.loginSuccess) {
              window.localStorage.setItem("userId", response.payload.userId);
              if (rememberMe === true) {
                window.localStorage.setItem("rememberMe", values.email);
              } else {
                localStorage.removeItem("rememberMe");
              }
              dispatch(push("/"));
            } else {
              setFormErrorMessage("Check out your Account or Password again");
            }
          })
          .catch((err) => {
            setFormErrorMessage("Check out your Account or Password again");
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
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <>
            <Title level={2}>Log In</Title>
            <Form onFinish={handleSubmit} style={{ width: "350px" }}>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
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

              <Form.Item required>
                <Input
                  id="password"
                  prefix={
                    <LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
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
              {formErrorMessage && (
                <label>
                  <ErrorText>{formErrorMessage}</ErrorText>
                </label>
              )}

              <Form.Item>
                <Checkbox
                  id="rememberMe"
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  Remember me
                </Checkbox>
                <Link
                  className="login-form-forgot"
                  to="/reset_user"
                  style={{ float: "right" }}
                >
                  forgot password
                </Link>
                <div style={{ margin: "10px 0" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: "100%" }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    Log in
                  </Button>
                </div>
                Or <Link to="/register">register now!</Link>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default LoginPage;
