import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const userCartObj = user?.cart;
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const navigate = useNavigate();

  let totalAmount = 0;

  userCartObj.map((i) => {
    totalAmount += i.cartId.product.price * i.cartId.quantity;
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="cart-container">
      <Row>
        <h1 className="pt-2 h3 text-center mb-4">Shopping cart</h1>
        {userCartObj.length === 0 && (
          <Alert variant="info">
            Shopping cart is empty. Add products to your cart{" "}
            <Link to="/category/all"> Add products</Link>
          </Alert>
        )}

        {userCartObj.length > 0 && (
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
                          <button
                            className="btn btn-outline-secondary"
                            disabled={user?.cart[item._id] <= 1}
                            onClick={() =>
                              decreaseCart({
                                cartId: item.cartId._id,
                              })
                            }
                          >
                            <ImMinus className="fs-6" />
                          </button>
                          <span className="fs-4">{item.cartId.quantity}</span>
                          <button
                            className="btn btn-outline-secondary"
                            disabled={user.cart[item._id] >= 10}
                            onClick={() =>
                              increaseCart({
                                cartId: item.cartId._id,
                              })
                            }
                          >
                            <BiPlusMedical className="fs-6" />
                          </button>
                        </span>
                      </td>
                      <td className="fs-4">
                        ${item.cartId.product.price * item.cartId.quantity}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            removeFromCart({
                              cartId: item.cartId._id,
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
                <h3 className="h4 m-0">Total: ${totalAmount}</h3>
                <button
                  disabled={user?.cart.count === 0}
                  className="btn btn-warning px-5 d-block fs-5"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
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
