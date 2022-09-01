import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FiDelete } from "react-icons/fi";
import { useForm } from "react-hook-form";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const [category, setCategory] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRemoveImg = (imgObj) => {};

  const showWidget = () => {};

  const onSubmit = (data) => console.log(data, category);

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mt-4">Create a product</h1>

            <Form.Group>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("productName", { required: true })}
              />
              <Form.Label>
                {errors.productName?.type === "required" && (
                  <span className="text-danger">
                    "Product name is required"
                  </span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price ($)"
                {...register("price", { required: true })}
              />
              <Form.Label>
                {errors.price?.type === "required" && (
                  <span className="text-danger">"Price is required"</span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
              />
              <Form.Label>
                {errors.price?.type === "required" && (
                  <span className="text-danger">"Quantity is required"</span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option disabled selected>
                  -- Select One --
                </option>
                <option value="technology">technology</option>
                <option value="tablets">tablets</option>
                <option value="phones">phones</option>
                <option value="laptops">laptops</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Product description"
                {...register("productDesc", { required: true })}
              />
              <Form.Label>
                {errors.productDesc?.type === "required" && (
                  <span className="text-danger">
                    "Product description is required"
                  </span>
                )}
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt="" />
                    {imgToRemove !== image.public_id && (
                      <FiDelete onClick={() => handleRemoveImg(image)} />
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit">Create Product</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
