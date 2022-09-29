import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { BiHeart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../api/appApi";
import { logout } from "../features/userSlice";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Preview = ({ _id, category, name, images, quantity, price }) => {
  const user = useSelector((state) => state.user);
  const [addToCart, { isSuccess, error }] = useAddToCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error) {
    dispatch(logout());
    navigate("/login");
    Cookies.remove("token");
  }

  if (isSuccess) {
    // toast.success(`${name} is added to your cart`);
  }

  return (
    <Col md={6} lg={3}>
      <div
        style={{
          backgroundColor: "#e1e1e1",
          height: "430px",
          width: "100%",
          borderRadius: "10px",
        }}
        className="position-relative"
      >
        <img
          variant="top"
          className="product-preview-img p-2 pb-0 w-100"
          src={images[0].url}
          style={{ height: "200px", objectFit: "cover" }}
          alt=""
        />
        {/* {quantity === 0 ? (
          <p
            className="bg-danger text-white fw-semibold text-center position-absolute"
            style={{
              padding: "10px",
              top: "0px",
              width: "100%",
              backgroundColor: "#6d726fe3",
            }}
          >
            OUT OF STOCK
          </p>
        ) : (
          <BiHeart
            className="position-absolute"
            style={{
              width: "30px",
              height: "30px",
              color: "red",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          />
        )} */}

        <div style={{ padding: "5%" }}>
          <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer" }}>
            <Card.Title
              className="mb-2"
              style={{ fontSize: "20px", marginBottom: "5px" }}
            >
              {name}
            </Card.Title>
          </LinkContainer>
          <p className="text-secondary mb-1 fs-6" style={{ fontSize: "16px" }}>
            Price: ${price}
          </p>
          <p
            className="text-secondary mb-2 fs-6"
            style={{ fontSize: "16px", textTransform: "capitalize" }}
          >
            Category: {category}
          </p>

          <div
            className="position-absolute"
            style={{ bottom: "15px", width: "90%" }}
          >
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                if (!user) {
                  return navigate("/login");
                }
                addToCart({
                  userId: user._id,
                  productId: _id,
                  price: price,
                  image: images[0].url,
                });
              }}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-success mt-2 w-100"
              onClick={() => {
                if (!user) {
                  return navigate("/login");
                }
                addToCart({
                  userId: user._id,
                  productId: _id,
                  price: price,
                  image: images[0].url,
                });
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>

          {user && user?.isAdmin && (
            <div
              className="position-absolute"
              style={{ bottom: "15px", width: "90%" }}
            >
              <LinkContainer to={`/product/${_id}/edit`}>
                <Button size="lg" className="w-100">
                  Edit Product
                </Button>
              </LinkContainer>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default Preview;
