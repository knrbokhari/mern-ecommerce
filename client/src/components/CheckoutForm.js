import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../api/appApi";
import { toast } from "react-toastify";
import { logout } from "../features/userSlice";
import Cookies from "js-cookie";

const CheckoutForm = ({ totalAmount, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  async function handlePay(e) {
    e.preventDefault();
    if (!stripe || !elements || user.cart.length <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      "http://localhost:5000/create-payment",
      // "https://calm-beach-92689.herokuapp.com/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: totalAmount }),
      }
    ).then((res) => {
      if (res.status === 403 || res.status === 401) {
        dispatch(logout());
        navigate("/login");
        Cookies.remove("token");
      }
      return res.json();
    });

    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      createOrder({
        userId: user._id,
        cart: user.cart,
        address,
        country,
        totalAmount,
        items,
        transactionId: paymentIntent.id,
      }).then((res) => {
        if (!isLoading && !isError) {
          toast.success(`Payment ${paymentIntent.status}`);
          setTimeout(() => {
            navigate("/dashboard/myodrer");
          }, 1000);
        }
      });
    }
  }

  return (
    <Col className="mt-3">
      <Form onSubmit={handlePay}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={user.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <label htmlFor="card-element" className="fs-5">
          Card
        </label>
        <CardElement id="card-element" />
        <Button
          className="mt-3 fs-5 px-5"
          type="submit"
          // disabled={user?.cart?.count <= 0 || paying || isSuccess}
        >
          {/* {paying ? "Processing..." : "Pay"} */}
          pay
        </Button>
      </Form>
    </Col>
  );
};

export default CheckoutForm;
