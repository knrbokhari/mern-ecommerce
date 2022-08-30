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

const Navigation = () => {
  return (
    <Navbar key={"lg"} bg="light" expand={"lg"} className="mb-3">
      <Container>
        <Navbar.Brand href="/">ECOM</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"lg"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
              {/* Offcanvas */}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown
                title="Category"
                id={`offcanvasNavbarDropdown-expand-${"lg"}`}
              >
                <NavDropdown.Item href="category/technology">
                  Technology
                </NavDropdown.Item>
                <NavDropdown.Item href="category/phones">
                  Phones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="category/laptops">
                  laptops
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/login">
                <BiHeart style={{ width: "30px", height: "30px" }} />
              </Nav.Link>
              <Nav.Link href="/login">
                <BsFillCartCheckFill
                  style={{ width: "30px", height: "30px" }}
                />
              </Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
