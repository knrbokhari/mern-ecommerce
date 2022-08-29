import React from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

const HomeBanner = () => {
  return (
    <Container>
      <Row>
        <Col lg={9}>
          <Carousel>
            <Carousel.Item className="rounded-2" interval={5000}>
              <img
                className="d-block w-100"
                src="https://i.ibb.co/xhtcsds/probg.png"
                alt="First slide"
                height={400}
              />
              <Carousel.Caption className="text-start">
                <Row>
                  <Col>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <Button className="btn btn-warning">Buy Now</Button>
                  </Col>
                  <Col>img</Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src="https://i.ibb.co/xhtcsds/probg.png"
                alt="Second slide"
                height={400}
              />
              <Carousel.Caption className="text-start">
                <Row>
                  <Col>
                    <h3>2d slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <Button className="btn btn-warning">Buy Now</Button>
                  </Col>
                  <Col>img</Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i.ibb.co/xhtcsds/probg.png"
                alt="Third slide"
                height={400}
              />
              <Carousel.Caption className="text-start">
                <Row>
                  <Col>
                    <h3>3r slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                    <Button className="btn btn-warning">Buy Now</Button>
                  </Col>
                  <Col>img</Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col lg={3} className="d-none d-lg-block">
          <Card style={{ height: "190px", background: "#f0f2f5f2" }}>
            <Card.Img
              src="https://www.journal-theme.com/1/image/cache/catalog/journal3/slider/demo1/b1-320x210w.png.webp"
              alt="Card image"
              height={190}
            />
            <Card.ImgOverlay>
              <Card.Title className="mt-5 mb-0" style={{ color: "#0d52d6" }}>
                Wearables
              </Card.Title>
              <Card.Text className="w-50 fs-6">
                Intelligent & Durable Design
              </Card.Text>
            </Card.ImgOverlay>
          </Card>

          <Card
            style={{
              height: "190px",
              marginTop: "20px",
              background: "#f0f2f5f2",
            }}
          >
            <Card.Img
              src="https://www.journal-theme.com/1/image/cache/catalog/journal3/slider/demo1/b2-320x210w.png.webp"
              alt="Card image"
              height={190}
            />
            <Card.ImgOverlay>
              <Card.Title className="mt-5 mb-0" style={{ color: "#0d52d6" }}>
                Computers
              </Card.Title>
              <Card.Text className="w-50 fs-6 text-dark">
                Build your own high powered PC
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBanner;
