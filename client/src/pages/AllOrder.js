import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import axios from "../axios";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import useProduct from "../hooks/useProduct";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products] = useProduct();
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);
  const token = Cookies.get("token");

  const handleClose = () => setShow(false);

  const markShipped = (orderId, ownerId) => {
    axios
      .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
      .then(({ data }) => setOrders(data))
      .catch((e) => console.log(e));
  };

  const showOrder = (productsObj) => {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">No orders yet</h1>;
  }

  const TableRow = ({
    _id,
    count,
    owner,
    total,
    status,
    products,
    address,
  }) => {
    return (
      <tr>
        <td>{_id}</td>
        <td>{owner?.name}</td>
        <td>{count}</td>
        <td>$ {total}</td>
        <td>{address}</td>
        <td>
          {status === "processing" ? (
            <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
              Mark as shipped
            </Button>
          ) : (
            <Badge bg="success">Shipped</Badge>
          )}
        </td>
        <td>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showOrder(products)}
          >
            View order <BsEyeFill /> <i className="fa fa-eye"></i>
          </span>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order details</Modal.Title>
        </Modal.Header>
        {orderToShow?.map((order) => (
          <div
            key={order._id}
            className="order-details__container d-flex justify-content-around py-2"
          >
            <img
              src={order.images[0].url}
              style={{ maxWidth: 100, height: 100, objectFit: "cover" }}
              alt=""
            />
            <p>
              <span>{order.count} x </span> {order.name}
            </p>
            <p>Price: ${Number(order.price) * order.count}</p>
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllOrder;
