import React from "react";
import { Card } from "react-bootstrap";
import { BiHeart } from "react-icons/bi";
import { LinkContainer } from "react-router-bootstrap";

const Preview = ({ _id, category, name, images, quantity, price }) => {
  return (
    <div className="position-relative overflow-hidden col-11 col-md-6 col-lg-3">
      <LinkContainer
        to={`/product/${_id}`}
        style={{
          cursor: "pointer",
          backgroundColor: "#e1e1e1",
          height: "430px",
        }}
        className="w-100"
      >
        <Card>
          <Card.Img
            variant="top"
            className="product-preview-img p-2 pb-0"
            src={images[0].url}
            style={{ height: "200px", objectFit: "cover" }}
          />
          {quantity === 0 ? (
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
              }}
            />
          )}

          <Card.Body>
            <Card.Title
              className=""
              style={{ fontSize: "20px", marginBottom: "5px" }}
            >
              {name}
            </Card.Title>

            <p
              className="text-secondary mb-1 fs-6"
              style={{ fontSize: "16px" }}
            >
              Price: ${price}
            </p>
            <p
              className="text-secondary mb-2 fs-6"
              style={{ fontSize: "16px", textTransform: "capitalize" }}
            >
              Category: {category}
            </p>
            <div className="position-absolute" style={{ bottom: "15px" }}>
              <button className="btn btn-primary" style={{ width: "90%" }}>
                Add to Cart
              </button>

              <button
                className="btn btn-success mt-2"
                type="button"
                style={{ width: "90%" }}
              >
                Buy Now
              </button>
            </div>
          </Card.Body>
        </Card>
      </LinkContainer>
    </div>
  );
};

export default Preview;
