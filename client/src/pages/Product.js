import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios";
import "./Product.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import ProductPreview from "../components/ProductPreview";

const Product = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [url, setUrl] = useState(null);
  // const [addToCart, { isSuccess }] = useAddToCartMutation();

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => {
      //   console.log(res);
      setProduct(res.data.product);
      setSimilar(res.data.similar);
    });
  }, []);
  const similarProducts = similar.filter((i) => i._id !== product._id);

  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <Swiper className="mySwiper2">
            {product?.images?.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={url || item.url} alt="product images" />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {product?.images?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="product-images-slider-thumbs-wrapper">
                  <img
                    src={item.url}
                    alt="product images"
                    onClick={() => {
                      setUrl(item.url);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product?.name}</h1>
          <p>
            <Badge bg="primary">{product?.category}</Badge>
          </p>
          <p className="product__price">${product?.price}</p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong> {product?.description}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <Button
                size="lg"
                // onClick={() =>
                //   addToCart({
                //     userId: user._id,
                //     productId: id,
                //     price: product.price,
                //     image: product.image[0].url,
                //   })
                // }
              >
                Add to cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2>Similar Products</h2>
        <div>
          {similar?.length === 0 && <p>Similar Products Not found</p>}
          <Row>
            {similar.map((product, i) => (
              <ProductPreview key={i} product={product} />
            ))}
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Product;
