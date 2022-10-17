/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Modal, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { logout } from "../features/userSlice";
import useProduct from "../hooks/useProduct";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products] = useProduct();
  const [orderToShow, setOrderToShow] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const handleClose = () => setShow(false);

  const markShipped = (orderId, ownerId) => {
    axios
      .patch(
        `/orders/${orderId}/mark-shipped`,
        { ownerId: ownerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => setOrders(data))
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/login");
          Cookies.remove("token");
        }
      });
  };

  const showOrder = (productsObj) => {
    // let productsToShow = products.filter((product) => productsObj[product._id]);
    // productsToShow = productsToShow.map((product) => {
    //   const productCopy = { ...product };
    //   productCopy.count = productsObj[product._id];
    //   delete productCopy.description;
    //   return productCopy;
    // });
    // const productsToShow  = orders.find(order => order._id === )
    // console.log(productsObj);
    setShow(true);
    setOrderToShow(productsObj);
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

  // console.log(orders[14]);

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
    <Container>
      <h2 className="text-center mb-4">All Orders</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Address</th>
            <th>Status</th>
            <th>View</th>
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
            className="order-details__container d-flex justify-content-start py-2"
          >
            <img
              src={order?.cartId?.product?.images[0].url}
              style={{ maxWidth: 100, height: 100, objectFit: "cover" }}
              alt=""
            />
            <div className="ms-3">
              <p className="fs-4 m-0">
                <span>{order?.cartId?.quantity} x </span>
                {order?.cartId?.product?.name}
              </p>
              <p className="fs-4">
                Price: $
                {Number(order?.cartId?.product?.price) *
                  order?.cartId?.quantity}
              </p>
            </div>
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllOrder;
