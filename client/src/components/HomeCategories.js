import React from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import categories from "../categories";

const HomeCategories = () => {
  return (
    <div className="recent-products-container container mt-4">
      <h2>Categories</h2>
      <Row>
        {categories.map((category) => (
          <LinkContainer
            key={category.name}
            to={`/category/${category.name.toLocaleLowerCase()}`}
          >
            <Col md={4}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                  gap: "10px",
                }}
                className="category-tile"
              >
                {category.name}
              </div>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </div>
  );
};

export default HomeCategories;
