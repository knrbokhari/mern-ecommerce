import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import ProductPreview from "../components/ProductPreview";
import "./Product.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useAddToCartMutation } from "../api/appApi";
import { logout } from "../features/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Product = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [addToCart, { isSuccess, error }] = useAddToCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchProduct = async () => {
    //   await
    axios.get(`/products/${id}`).then((res) => {
      //   console.log(res);
      setProduct(res.data.product);
      setSimilar(res.data.similar);
    });
    // };

    // fetchProduct();
  }, [id]);

  if (error) {
    dispatch(logout());
    navigate("/login");
    Cookies.remove("token");
  }
  console.log(user);
  // console.log(what);

  if (isSuccess) {
    // toast.success(`${product.name} is in your cart`);
    // console.log(`${product.name} is in your cart`);
  }

  const similarProducts = similar
    .filter((i) => i._id !== product._id)
    .slice(0, 4);

  return (
    <Container className="pt-4" style={{ position: "relative" }}>
      <Row>
        <Col lg={6} className="body">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {product?.images?.map((item, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img src={item.url} alt="product images" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col lg={6} className="pt-4">
          <h1>{product?.name}</h1>
          <p className="m-0 mb-1 fs-5">
            Category:{" "}
            <Badge bg="primary" className="text-uppercase">
              {" "}
              {product?.category}
            </Badge>
          </p>
          <p className="m-0 mb-1 fs-5">Price: ${product?.price}</p>
          <p className="m-0 mb-1 fs-5">Quantity: {product?.quantity}</p>
          {user && !user.isAdmin && (
            <div className="d-block w-100">
              {/* <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select> */}
              <Button
                className="d-block w-100 mb-2 text-white fs-4"
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    price: product.price,
                    image: product.images[0].url,
                  })
                }
              >
                Add to cart
              </Button>
              <Button
                size="lg"
                className="d-block w-100 btn-warning text-white fs-4"
                // onClick={() => )}
              >
                Buy Now
              </Button>
            </div>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
        </Col>
        <p style={{ textAlign: "justify" }} className="px-3 m-0 mt-4">
          <strong>Description:</strong> {product?.description}
        </p>
      </Row>
      <div className="my-4">
        <h2 className="mb-4">Similar Products</h2>
        <div>
          {similarProducts?.length === 0 && <p>Similar Products Not found</p>}
          <Row style={{ rowGap: "20px" }}>
            {similarProducts.map((product, i) => (
              <ProductPreview key={i} product={product} />
            ))}
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Product;
