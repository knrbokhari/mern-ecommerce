import React, { useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const userCartObj = user.cart;
  const [products] = useProduct();
  let cart = products.filter((product) => userCartObj[product._id] != null);

  return (
    <Container className="cart-container">
      <Row>
        <h1 className="pt-2 h3 text-center mb-4">Shopping cart</h1>
        {cart.length === 0 && (
          <Alert variant="info">
            Shopping cart is empty. Add products to your cart{" "}
            <Link to="/category/all"> Add products</Link>
          </Alert>
        )}

        {cart.length > 0 && (
          <Col md={12}>
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, i) => (
                    <tr key={i}>
                      <td>&nbsp;</td>
                      <td>
                        <img
                          src={item.images[0].url}
                          alt=""
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <span className="quantity-indicator">
                          <i className="fa fa-minus-circle"></i>
                          <span>{user.cart[item._id]}</span>
                          <i className="fa fa-plus-circle"></i>
                        </span>
                      </td>
                      <td>${item.price * user.cart[item._id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
              </div>
            </>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
