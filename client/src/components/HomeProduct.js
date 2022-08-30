import React from "react";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  return (
    <div className="featured-products-container container mt-4">
      <h2>Last products</h2>
      <div className="d-flex justify-content-center flex-wrap">
        last products here
      </div>
      <div>
        <Link
          to="/category/all"
          style={{
            textAlign: "right",
            display: "block",
            textDecoration: "none",
          }}
        >
          See more {">>"}
        </Link>
      </div>
    </div>
  );
};

export default HomeProduct;
