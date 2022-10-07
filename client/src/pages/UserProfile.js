import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import { logout } from "../features/userSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, cart, address, country } = user;

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

  return (
    <div className="container">
      <h1>User Profile</h1>

      <div className="w-100 border-1">
        <div className="d-flex p-4">
          <div className="">
            <img
              src="https://i.ibb.co/d7mQQd4/userP3.jpg"
              alt=""
              className="img-fluid rounded-circle mx-auto"
              width={150}
            />
          </div>
          <div className="ms-5">
            <h5>Name: {name}</h5>
            <h5>Email: {email} </h5>
            <h5>Cart items: {cart?.length} </h5>
            <h5>Address: {address || "Not added"} </h5>
            <h5>Country: {country || "Not added"}</h5>
            <h5>Total Order: {orders?.length} </h5>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4 pt-4 pb-2">
        <h3 className="mb-3">Order Histry</h3>
        {orders.length === 0 && <p className="text-center">No orders yet</p>}
        {orders.length !== 0 && (
          <table class="table table-hover responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order ID</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
                <th>Date</th>
                <th scope="col">Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item._id}</td>
                  <td>{item.count}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                  <td>{item.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
