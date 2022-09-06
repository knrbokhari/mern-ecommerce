import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../api/appApi";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImMinus } from "react-icons/im";
import { BiPlusMedical } from "react-icons/bi";
import Loading from "../components/Loading";

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const userCartObj = user.cart;
  const [products] = useProduct();
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  if (isLoading) {
    return <Loading />;
  }

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
              <Table responsive="sm" className="cart-table" striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
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
                          <button
                            className="btn btn-outline-secondary"
                            disabled={user?.cart[item._id] <= 1}
                            onClick={() =>
                              decreaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          >
                            <ImMinus className="fs-6" />
                          </button>
                          <span className="fs-4">{user?.cart[item._id]}</span>
                          <button
                            className="btn btn-outline-secondary"
                            disabled={user.cart[item._id] >= 10}
                            onClick={() =>
                              increaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          >
                            <BiPlusMedical className="fs-6" />
                          </button>
                        </span>
                      </td>
                      <td className="fs-4">
                        ${item.price * user.cart[item._id]}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            removeFromCart({
                              productId: item._id,
                              price: item.price,
                              userId: user._id,
                            })
                          }
                        >
                          <AiTwotoneDelete className="fs-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="h4 m-0">Total: ${user.cart.total}</h3>
                <button className="btn btn-warning px-5 d-block fs-5">
                  Buy Now
                </button>
              </div>
            </>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
