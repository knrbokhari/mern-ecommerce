import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "../api/appApi";
import axios from "../axios";

const HomeBanner = () => {
  const [topProduct, setTopProduct] = useState([]);
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess, error }] = useAddToCartMutation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/products/bestselling/3").then((res) => {
      setTopProduct(res.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={9}>
          <Carousel>
            {topProduct.map((product) => (
              <Carousel.Item
                key={product?._id}
                className="rounded-2"
                interval={3000}
              >
                <img
                  className="d-block w-100"
                  src="https://i.ibb.co/xhtcsds/probg.png"
                  alt="First slide"
                  height={400}
                />
                <Carousel.Caption className="text-start">
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <h6 className="m-0 text-uppercase">
                        Best Selling {product.category}
                      </h6>
                      <h3 className="mb-1">{product.name}</h3>
                      <h4 className="mb-3">
                        <Badge bg="success" className="text-uppercase">
                          $ {product.price}
                        </Badge>
                      </h4>
                      <Button
                        className="btn btn-warning"
                        onClick={() => {
                          addToCart({
                            userId: user?._id,
                            productId: product?._id,
                            price: product?.price,
                            image: product?.images[0].url,
                          });
                          navigate("/checkout");
                        }}
                      >
                        Buy Now
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <img
                        src={product.images[0].url}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col lg={3} className="d-none d-lg-block">
          <Card
            style={{
              height: "190px",
              background: "#f0f2f5f2",
              cursor: "pointer",
            }}
            onClick={() => navigate("/category/technology")}
          >
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
              cursor: "pointer",
            }}
            onClick={() => navigate("/category/laptop")}
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
