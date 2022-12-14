import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Signup.css";
import { useLoginMutation } from "../api/appApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Login() {
  const [login, { error, isLoading, isError, data, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(error.data);
    }
  }, [isError]);

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  if (data?.token) {
    Cookies.set("token", data?.token, { expires: 1 });
  }

  if (isSuccess) {
    navigate("/");
  }

  return (
    <Container>
      <Row>
        <Col lg={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login to your account</h1>
            <Form.Group className="mt-5">
              <Form.Label className="fs-5">Email Address</Form.Label>
              <Form.Control
                defaultValue="user@gmail.com"
                placeholder="Your Email"
                className="fs-5"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <Form.Label className="mt-1">
                {errors.email?.type === "required" && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group className="">
              <Form.Label className="fs-5">Password</Form.Label>
              <Form.Control
                defaultValue="123456"
                type="password"
                placeholder="Password"
                className="fs-5"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <Form.Label className="m-1">
                {errors.password?.type === "required" && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                className="fs-5 btn-lg"
                disabled={isLoading}
              >
                Login
              </Button>
            </Form.Group>

            <p className="pt-3 text-center fs-5">
              Don't have an account? <Link to="/signup">Create account</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col lg={6} className="login__image--container d-none d-md-block"></Col>
      </Row>
    </Container>
  );
}

export default Login;
