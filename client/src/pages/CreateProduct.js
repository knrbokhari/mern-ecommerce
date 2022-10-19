import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MdClear } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../api/appApi";
import { toast } from "react-toastify";
import "./CreateProduct.css";
import Cookies from "js-cookie";

const CreateProduct = () => {
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // get Bearer token from Cookie
  const token = `Bearer ${Cookies.get("token")}`;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (isError) {
    toast.error(error.message);
  }

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dbnaeem",
        uploadPreset: "l7km97n1",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  const onSubmit = (data) => {
    const { name, description, price, quantity } = data;
    createProduct({
      name,
      description,
      price: parseInt(price),
      quantity: parseInt(quantity),
      category,
      images,
    }).then((res) => {
      // console.log(res);
      if (res.data.success > 0) {
        setTimeout(() => {
          navigate("/");
          toast.success("Product Created");
        }, 1500);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col lg={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mt-4">Create a product</h1>

            <Form.Group>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
              <Form.Label>
                {errors.name?.type === "required" && (
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
                {errors.quantity?.type === "required" && (
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
                <option disabled selected required>
                  -- Select One --
                </option>
                <option value="technology">Technology</option>
                <option value="tablets">Tablets</option>
                <option value="phones">Phones</option>
                <option value="laptops">Laptops</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Product description"
                {...register("description", { required: true })}
              />
              <Form.Label>
                {errors.description?.type === "required" && (
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
                      <MdClear onClick={() => handleRemoveImg(image)} />
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col
          md={6}
          className="new-product__image--container d-none d-lg-block"
        ></Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
