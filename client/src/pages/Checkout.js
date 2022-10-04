import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const userCartObj = user.cart;

  const stripePromise = loadStripe(
    "pk_test_51L17qxHBn8eTkaGlOjG2JgVVcr6jvC5t7ubxyFEBpQr3tv8Xb3TvEKUDRPVOMmgZpFmi4BJg9whkV1PjdhB88hgZ00tq97usGQ"
  );

  let totalAmount = 0;
  let items = 0;

  userCartObj.map((i) => {
    totalAmount += i.cartId.product.price * i.cartId.quantity;
    items += i.cartId.quantity;
  });

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Table className="cart-table" responsive striped>
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
              {userCartObj?.map((item, i) => (
                <tr key={i}>
                  <td className="fs-4">{i + 1}</td>
                  <td>
                    <img
                      src={item?.cartId?.product?.images[0]?.url}
                      alt=""
                      style={{
                        width: 45,
                        height: 45,
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="fs-4">${item.cartId.product.price}</td>
                  <td>
                    <span className="quantity-indicator d-flex align-items-center justify-content-evenly">
                      <span className="fs-4">{item.cartId.quantity}</span>
                    </span>
                  </td>
                  <td className="fs-4">
                    ${item.cartId.product.price * item.cartId.quantity}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Total Price: ${totalAmount}</h3>
        </Col>
        <Col md={6}>
          <Elements stripe={stripePromise}>
            {<CheckoutForm totalAmount={totalAmount} items={items} />}
          </Elements>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
