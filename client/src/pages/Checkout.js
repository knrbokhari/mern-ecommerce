import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import useProduct from "../hooks/useProduct";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const userCartObj = user.cart;
  const [products] = useProduct();
  let cart = products.filter((product) => userCartObj[product._id] != null);

  const stripePromise = loadStripe(
    "pk_test_51L17qxHBn8eTkaGlOjG2JgVVcr6jvC5t7ubxyFEBpQr3tv8Xb3TvEKUDRPVOMmgZpFmi4BJg9whkV1PjdhB88hgZ00tq97usGQ"
  );

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Table responsive="sm" className="cart-table" striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td className="fs-4">{i + 1}</td>
                  <td>
                    <img
                      src={item.images[0].url}
                      alt=""
                      style={{
                        width: 45,
                        height: 45,
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="fs-4">${item.price}</td>
                  <td>
                    <span className="quantity-indicator d-flex align-items-center justify-content-evenly">
                      <span className="fs-4">{user?.cart[item._id]}</span>
                    </span>
                  </td>
                  <td className="fs-4">${item.price * user.cart[item._id]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Total Price: ${user.cart.total}</h3>
        </Col>
        <Col md={6}>
          <Elements stripe={stripePromise}>{<CheckoutForm />}</Elements>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
