import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Pagination from "../components/Pagination";
import Preview from "../components/Preview";
import Loading from "../components/Loading";

const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (true) {
    <Loading />;
  }

  const productsSearch = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductSearch = ({ _id, category, name, images, quantity, price }) => {
    return (
      <Preview
        _id={_id}
        category={category}
        name={name}
        images={images}
        quantity={quantity}
        price={price}
      />
    );
  };

  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="filters-container d-flex justify-content-center pt-4 pb-4">
        <FloatingLabel
          controlId="floatingInput"
          label="Search"
          className="mx-auto d-block"
          style={{ width: "300px" }}
        >
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FloatingLabel>
      </div>
      {productsSearch.length === 0 ? (
        <h1 className="text-center">No products to show</h1>
      ) : (
        <Container>
          <Pagination
            data={productsSearch}
            RenderComponent={ProductSearch}
            pageLimit={1}
            dataLimit={8}
            tablePagination={false}
          />
        </Container>
      )}
    </div>
  );
};

export default CategoryPage;
