import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
// import { updateProducts } from "../features/productSlice";
import { useState } from "react";
import ProductPreview from "./ProductPreview";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const lastProducts = products.slice(0, 8);

  useEffect(() => {
    axios.get("/products").then(({ data }) => setProducts(data));
  }, []);

  return (
    <div className="featured-products-container container mt-4">
      <h2 className="mb-4">Last products</h2>
      <div className="row gy-4">
        {lastProducts.map((product) => (
          <ProductPreview key={product._id} product={product} />
        ))}
      </div>
      <div>
        <Link
          to="/category/all"
          style={{
            textAlign: "right",
            display: "block",
            textDecoration: "none",
            marginTop: "20px",
          }}
        >
          See more {">>"}
        </Link>
      </div>
    </div>
  );
};

export default HomeProduct;
