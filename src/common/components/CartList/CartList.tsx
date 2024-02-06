import { Container, ListGroup, Button, Card } from "react-bootstrap";
import { Cart } from "../../models/Cart";

interface CartListProps {
  cart: Cart;
}

export const CartList = ({ cart }: CartListProps) => {
  const { cartProducts, totalCartPrice } = cart;

  const list = cartProducts?.map((product) => {
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
          <span>Total: {product.totalPrice}Eur</span>
        </div>
      </ListGroup.Item>
    );
  });

  let cartNotEmpty = cart.cartProducts.length > 0;

  return (
    <Container className="vstack gap-3">
      <ListGroup as="ol">{list}</ListGroup>
      <Card body className="h6">{cartNotEmpty ? `Subtotal: ${totalCartPrice}Eur` : "Your cart is empty"}</Card>
      <Button className="mx-auto">View cart</Button>
    </Container>
  );
};
