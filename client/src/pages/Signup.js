import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../api/appApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Signup = () => {
  const [signup, { error, isLoading, isError, data, isSuccess }] =
    useSignupMutation();
  const navigate = useNavigate();

  if (data?.token) {
    Cookies.set("token", data?.token, { expires: 1 });
  }

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
    const { name, email, password } = data;
    signup({ name, email, password });
  };

  if (isSuccess) {
    navigate("/");
  }

  return (
    <Container>
      <Row>
        <Col lg={6} className="signup__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <h1>Create an account</h1>
            <Form.Group className="mt-5">
              <Form.Label className="fs-5">Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                className="fs-5"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
              />
              <Form.Label>
                {errors.name?.type === "required" && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label className="fs-5">Email Address</Form.Label>
              <Form.Control
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
              <Form.Label>
                {errors.email?.type === "required" && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Password</Form.Label>
              <Form.Control
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
              <Form.Label>
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
                Create account
              </Button>
            </Form.Group>
            <p className="pt-3 text-center fs-5">
              Have an account? <Link to="/login">Login</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col
          lg={6}
          className="signup__image--container  d-none d-md-block"
        ></Col>
      </Row>
    </Container>
  );
};

export default Signup;
