import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Signup.css";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Row>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <h1>Login to your account</h1>
            <Form.Group className="mt-5">
              <Form.Label className="fs-5">Email Address</Form.Label>
              <Form.Control
                // type="email"
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
              <Button type="submit" className="fs-5 btn-lg">
                Login
              </Button>
            </Form.Group>

            <p className="pt-3 text-center fs-5">
              Don't have an account? <Link to="/signup">Create account</Link>{" "}
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container d-none d-md-block"></Col>
      </Row>
    </Container>
  );
}

export default Login;
