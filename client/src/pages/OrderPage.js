import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import { logout } from "../features/userSlice";
import moment from "moment";

const OrderPage = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/login");
          Cookies.remove("token");
        }
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No orders yet</h1>;
  }

  return (
    <Container>
      <h1 className="text-center">Your orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Items</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.products.length}</td>
              <td>
                <Badge
                  bg={`${
                    order.status === "processing" ? "warning" : "success"
                  }`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{moment(order?.createdAt).format("LLL")}</td>

              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderPage;
