import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { MdSecurity } from "react-icons/md";

const WhyUs = () => {
  return (
    <div className="mt-4">
      <div style={{ background: "#3a4555" }}>
        <div className="container">
          <Row>
            <Col md={6} xl={3} className="p-3">
              <div className="d-flex align-items-center">
                <div
                  className="p-3 rounded-circle border-2 me-3"
                  style={{ border: "4px solid #0d52d6" }}
                >
                  <FaShippingFast
                    style={{ width: "40px", height: "40px", color: "#e96631" }}
                  />
                </div>
                <div className="text-white">
                  <h5 className="mb-0 fs-4">Free Shipping</h5>
                  <p className="m-0 text-secondary fs-5">
                    Free delivery over $10
                  </p>
                </div>
              </div>
            </Col>

            <Col md={6} xl={3} className="p-3">
              <div className="d-flex align-items-center">
                <div
                  className="p-3 rounded-circle border-2 me-3"
                  style={{ border: "4px solid #0d52d6" }}
                >
                  <TiArrowBack
                    style={{ width: "40px", height: "40px", color: "#e96631" }}
                  />
                </div>
                <div className="text-white">
                  <h5 className="mb-0 fs-4">Free Returns</h5>
                  <p className="m-0 text-secondary fs-5">Hassle free returns</p>
                </div>
              </div>
            </Col>

            <Col md={6} xl={3} className="p-3">
              <div className="d-flex align-items-center">
                <div
                  className="p-3 rounded-circle border-2 me-3"
                  style={{ border: "4px solid #0d52d6" }}
                >
                  <MdSecurity
                    style={{ width: "40px", height: "40px", color: "#e96631" }}
                  />
                </div>
                <div className="text-white">
                  <h5 className="mb-0 fs-4">Secure Shopping</h5>
                  <p className="m-0 text-secondary fs-5">
                    Best security features
                  </p>
                </div>
              </div>
            </Col>

            <Col md={6} xl={3} className="p-3">
              <div className="d-flex align-items-center">
                <div
                  className="p-3 rounded-circle border-2 me-3"
                  style={{ border: "4px solid #0d52d6" }}
                >
                  <FiBox
                    style={{ width: "40px", height: "40px", color: "#e96631" }}
                  />
                </div>
                <div className="text-white">
                  <h5 className="mb-0 fs-4">Unlimited Blocks</h5>
                  <p className="m-0 text-secondary fs-5">
                    Any content, any page
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Container className="mt-5">
        <h1 className="text-center">Why buy from us?</h1>
        <div
          style={{
            height: "3px",
            width: "100px",
            background: "#e96631",
            margin: "0px auto 9px",
          }}
        ></div>
        <div className="text-center fs-5 text-secondary">
          If you’re looking for something new, you’re in the right place. We
          strive to be industrious and innovative, offering our customers
          something they want, putting their desires at the top of our priority
          list.
          <Link to="/" className="text-decoration-none">
            Learn more
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default WhyUs;
