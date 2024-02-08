import { useState } from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

import CartIcon from "../../../assets/icons/basket3.svg";
import SearchIcon from "../../../assets/icons/search.svg";

import { CartList } from "../CartList/CartList";
import { Cart } from "../../models/Cart";

interface CartListProps {
  cart: Cart;
}

export const NavbarBox = ({ cart }: CartListProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpenCart = () => setShow(true);

  return (
    <Navbar
      bg="white"
      data-bs-theme="light"
      style={{ borderBottom: "1px solid lightGrey", marginBottom: "20px" }}
    >
      <Container style={{ maxHeight: "100px", gap: "10px" }}>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <img className="search-icon" src={SearchIcon} alt="search-logo" />
        <img
          className="cart-icon"
          src={CartIcon}
          alt="cart-logo"
          onClick={handleOpenCart}
        />
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CartList cart={cart} />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};
