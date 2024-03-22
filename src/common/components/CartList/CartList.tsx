import { Container, ListGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

import { CartProduct } from "../../models/CartProduct";
import { getCartFromLocalStorage } from "../../utils/localStorage";

interface OffcanvasProps {
  closeOffcanvas(): void;
}

export const CartList = ({ closeOffcanvas }: OffcanvasProps) => {
  const getCart = getCartFromLocalStorage("cart");
  const { cartProducts, totalCartPrice } = getCart;

  const list = cartProducts?.map((product: CartProduct) => {
    return (
      <ListGroup.Item
        key={product.title}
        as="li"
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <p className="h6">{product.title}</p>
          <div className="d-flex gap-1">
            <span>{product.quantity}x</span>
            <span>{product.price}Eur</span>
          </div>
        </div>

        <div className="fw-bold d-flex gap-2">
          <span>Total: {product.totalPrice} Eur</span>
        </div>
      </ListGroup.Item>
    );
  });

  let cartNotEmpty = true;
  if (!cartProducts) cartNotEmpty = false;

  return (
    <Container className="vstack gap-3">
      <ListGroup as="ol">{list}</ListGroup>
      <Card body className="h6 text-end">
        {cartNotEmpty
          ? `Subtotal: ${totalCartPrice} Eur`
          : "Your cart is empty"}
      </Card>
      <Button
        className="mx-auto bg-transparent text-black border-black p-0"
        onClick={closeOffcanvas}
      >
        <Link to={cartNotEmpty ? routes.cart : "#"} className="button-link">
          View cart
        </Link>
      </Button>
    </Container>
  );
};
