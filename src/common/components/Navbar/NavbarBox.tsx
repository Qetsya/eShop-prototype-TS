import { useState } from "react";
import { Container, Navbar, Nav, Offcanvas, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import CartIcon from "../../../assets/icons/basket3.svg";
import SearchIcon from "../../../assets/icons/search.svg";

import { CartList } from "../CartList/CartList";
import { Cart } from "../../models/Cart";

import { routes } from "../../routes/routes";
import { getCartFromLocalStorage } from "../../utils/localStorage";

interface Props {
  updateCartBadge: Cart;
}

export const NavbarBox = ({ updateCartBadge }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpenCart = () => setShow(true);

  let cart = getCartFromLocalStorage("cart");

  if (updateCartBadge) {
    cart = getCartFromLocalStorage("cart");
  }

  return (
    <Navbar
      bg="white"
      data-bs-theme="light"
      style={{ borderBottom: "1px solid lightGrey", marginBottom: "20px" }}
    >
      <Container style={{ maxHeight: "100px", gap: "10px" }}>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Nav className="me-auto">
          <Link to={routes.shop} className="button-link">Home</Link>
          <Link to="#features" className="button-link">Features</Link>
          <Link to="#pricing" className="button-link">Pricing</Link>
        </Nav>
        <img className="search-icon" src={SearchIcon} alt="search-logo" />
        <img
          className="cart-icon"
          src={CartIcon}
          alt="cart-logo"
          onClick={handleOpenCart}
        />
        <div className="cartBadgeBox">
          <Badge onClick={handleOpenCart} className="cartBadge" bg="info">
            {cart.totalCartQuantity ? cart.totalCartQuantity : ""}
          </Badge>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CartList closeOffcanvas={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};
