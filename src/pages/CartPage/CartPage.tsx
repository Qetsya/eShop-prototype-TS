import { useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Card, Container, Button } from "react-bootstrap";

import { Cart } from "../../common/models/Cart";
import { CartItem } from "./CartItem";
import { CartProduct } from "../../common/models/CartProduct";

import { getCartFromLocalStorage } from "../../common/utils/localStorage";
import { setCartToLocalStorage } from "../../common/utils/localStorage";
import { emptyCartInLocalStorage } from "../../common/utils/localStorage";
import { routes } from "../../common/routes/routes";

interface CartProps {
  cart: Cart;
  updateCartBadge: (item: Cart) => void;
}

export const CartPage = ({ cart, updateCartBadge }: CartProps) => {
  const cartFromLocalStorage = getCartFromLocalStorage("cart");
  const { cartProducts, totalCartPrice } = cartFromLocalStorage;
  const [updatedCartPrice, setUpdatedCartprice] = useState(totalCartPrice);

  let cartNotEmpty = cartProducts?.length > 0;

  const updateProduct = (product: CartProduct) => {
    for (let prod of cart.cartProducts) {
      if (prod.id === product.id) {
        prod.updateQuantityAndPrice(product.quantity);
      }
    }
    cart.updateQuantityAndPrice();
    updateCartBadge(cart);

    setCartToLocalStorage("cart", cart);
    setUpdatedCartprice(cart.totalCartPrice);
  };

  const removeProduct = (product: CartProduct) => {
    cart.removeProduct(product);
    setCartToLocalStorage("cart", cart);
    setUpdatedCartprice(cart.totalCartPrice);
    updateCartBadge(cart);
  };

  const emptyCart = () => {
    emptyCartInLocalStorage("cart");
    cart.emptyCart();
    updateCartBadge(cart);
  };

  return (
    <>
      <p className="h2 text-center pb-3">Your Cart</p>
      <Container className="vstack gap-3">
        <ListGroup as="ol">
          <ListGroup.Item className="d-flex">
            <p className="flex1 mb-0 fw-bold">Item</p>
            <div className="flex1 d-flex justify-content-between">
              <p className="mb-0 fw-bold">Price</p>
              <p className="mb-0 fw-bold">Quantity</p>
              <p className="mb-0 fw-bold">Total</p>
            </div>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup as="ol">
          {cartProducts?.map((product: CartProduct) => {
            return (
              <CartItem
                cartProduct={product}
                key={product.id}
                removeProductInCart={removeProduct}
                updateProduct={updateProduct}
              />
            );
          })}
        </ListGroup>
        <Card body className="h6 text-end fw-bold">
          {cartNotEmpty
            ? `Subtotal: ${updatedCartPrice} Eur`
            : "Your cart is empty"}
        </Card>
        <Button className="mx-auto bg-transparent text-black border-black p-0">
          <Link to={routes.shop} className="button-link">
            Continue shopping
          </Link>
        </Button>
        <Button className="mx-auto bg-black text-white border-black p-0">
          <Link
            to={routes.notFound}
            onClick={emptyCart}
            className="button-link"
          >
            Checkout
          </Link>
        </Button>
      </Container>
    </>
  );
};
