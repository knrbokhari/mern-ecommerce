import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar key={"lg"} bg="light" expand={"lg"} className="mb-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>ECOM</Navbar.Brand>
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
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <NavDropdown
                title="Category"
                id={`offcanvasNavbarDropdown-expand-${"lg"}`}
              >
                <LinkContainer to="/category/technology">
                  <NavDropdown.Item>Technology</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/phones">
                  <NavDropdown.Item>Phones</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/category/laptops">
                  <NavDropdown.Item>laptops</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/Wishlist">
                <Nav.Link>
                  <BiHeart style={{ width: "30px", height: "30px" }} />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <BsFillCartCheckFill
                    style={{ width: "30px", height: "30px" }}
                  />
                </Nav.Link>
              </LinkContainer>
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
                  <LinkContainer to="/dashboard/myOrder">
                    <NavDropdown.Item>My Order</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/dashboard/">
                    <NavDropdown.Item>My Order</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
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
