import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useDeleteProductMutation } from "../api/appApi";
import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { toast } from "react-toastify";

const GetAllProducts = () => {
  const [products] = useProduct();
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const deleteModalClose = () => setShow(false);
  const deleteModalShow = () => setShow(true);

  // removing the product
  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const handleDeleteProduct = (id, name) => {
    // deletProduct({ product_id: id, user_id: user._id });
    toast(`${name} has been Deleted`);
    setShow(false);
  };

  const TableRow = ({ images, _id, name, price }) => {
    return (
      <tr>
        <td>
          <img
            src={images[0].url}
            className="dashboard-product-preview"
            alt=""
          />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <Button
            className="mb-3 d-block w-100"
            onClick={deleteModalShow}
            // onClick={() => handleDeleteProduct(_id, user._id)}
            disabled={isLoading}
          >
            Delete
          </Button>

          {/* delete module */}
          <Modal
            className="bg-transparent"
            show={show}
            onHide={deleteModalClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure? <br /> Do you want to Delete {name}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={deleteModalClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDeleteProduct(_id, user._id, name)}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>

          <Link
            to={`/product/${_id}/edit`}
            className="btn btn-warning  d-block"
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <h2 className="text-center mb-4">All Product</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={products}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={8}
            tablePagination={true}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default GetAllProducts;
