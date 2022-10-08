import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "../features/userSlice";
import Cookies from "js-cookie";
import { format } from "timeago.js";
import moment from "moment";
import { useUpdateNotificationsMutation } from "../api/appApi";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const userCarts = user?.cart;
  const dispatch = useDispatch();
  const [updateNotifications, { error }] = useUpdateNotificationsMutation();
  const unreadNotifications = user?.notifications.filter(
    (notification) => notification?.status === "unread"
  );
  let cartItem = 0;

  if (userCarts) {
    userCarts.map((i) => {
      cartItem += i?.cartId?.quantity;
    });
  }

  const handleToggleNotifications = () => {
    dispatch(resetNotifications());
    updateNotifications(user._id);

    if (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
  };

  return (
    <Navbar key={"lg"} bg="light" expand={"lg"} className="mb-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="ms-5 ps-3 ps-md-0 ms-md-5 ms-lg-0">
            ECOM
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"lg"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
              {user ? user.email : "Menu"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <NavDropdown
                title="Category"
                id={`offcanvasNavbarDropdown-expand-${"lg"}`}
              >
                <LinkContainer to="/category/all">
                  <NavDropdown.Item>All Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/technology">
                  <NavDropdown.Item>Technology</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/phones">
                  <NavDropdown.Item>Phones</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/laptop">
                  <NavDropdown.Item>laptops</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {/* <LinkContainer to="/Wishlist">
                <Nav.Link>
                  <BiHeart style={{ width: "30px", height: "30px" }} />
                </Nav.Link>
              </LinkContainer> */}
              {user && !user?.isAdmin && (
                <LinkContainer to="/cart">
                  <Nav.Link className="position-relative">
                    <BsFillCartCheckFill
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                      {cartItem < 0 ? (
                        <></>
                      ) : (
                        <>
                          {cartItem}
                          <span className="visually-hidden">items</span>
                        </>
                      )}
                    </span>
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && (
                <NavDropdown
                  title="Dashboard"
                  id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                >
                  {user.isAdmin && (
                    <LinkContainer to="/dashboard/users">
                      <NavDropdown.Item>All Users</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {user.isAdmin && (
                    <LinkContainer to="/dashboard/addProduct">
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {user.isAdmin && (
                    <LinkContainer to="/dashboard/allProduct">
                      <NavDropdown.Item>All Product</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {user.isAdmin && (
                    <LinkContainer to="/dashboard/allOrder">
                      <NavDropdown.Item>All Order</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {!user.isAdmin && (
                    <LinkContainer to="/dashboard/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  {!user.isAdmin && (
                    <LinkContainer to="/dashboard/myodrer">
                      <NavDropdown.Item>My Order</NavDropdown.Item>
                    </LinkContainer>
                  )}
                </NavDropdown>
              )}

              <div className="notifications-dropdown">
                {user && (
                  <NavDropdown
                    className="dropdownNotifications"
                    title={
                      <>
                        <MdNotifications
                          onClick={handleToggleNotifications}
                          style={{ width: "30px", height: "30px" }}
                        />
                        <span className="position-absolute translate-middle badge rounded-pill bg-danger badge-notification">
                          {unreadNotifications?.length}
                          <span className="visually-hidden">items</span>
                        </span>
                      </>
                    }
                  >
                    {user?.notifications.length === 0 ? (
                      <p className="text-center mb-0">No notifcations yet</p>
                    ) : (
                      user.notifications.map((notification) => (
                        <p
                          className={`notification-${notification.status} word-wrap my-1 p-1 notifications`}
                        >
                          <span className="d-block ms-2">
                            {notification?.message} at{" "}
                            {/* {format(notification?.time)} */}
                            {moment(notification.time)
                              .startOf("hour")
                              .fromNow()}
                          </span>
                        </p>
                      ))
                    )}
                  </NavDropdown>
                )}
              </div>

              {user ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
