import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
  Form,
  Alert,
} from "react-bootstrap";

import { Product } from "../../models/Product";
import { CartProduct } from "../../models/CartProduct";
import { useState } from "react";

interface ProductProps {
  product: Product;
  addedProduct(item: CartProduct): void;
}

export const ProductCard = ({ product, addedProduct }: ProductProps) => {
  const { name, stock, price } = product;

  const [insertedProductQuantity, setInsertedProductQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [quantityError, setQuantityError] = useState("");

  const addProductToCart = () => {
    try {
      const cartProduct = new CartProduct(insertedProductQuantity, product);
      addedProduct(cartProduct);
      setShowAlert(true);
      resetAlerts();
    } catch (e) {
      setQuantityError((e as Error).message);
      resetAlerts();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = Math.round(Number(e.target.value));

    if (newQuantity > stock) {
      newQuantity = stock;
    }
    e.target.value = String(newQuantity);

    setInsertedProductQuantity(newQuantity);
  };

  const resetAlerts = () => {
    setTimeout(() => {
      setQuantityError("");
      setShowAlert(false);
    }, 5000);
  };

  return (
    <>
      <Card border="primary" style={{ maxWidth: "15rem" }}>
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>
            Price: <span>{price}Eur</span>
          </CardText>
          <Form.Group className="productCard-form">
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              onChange={handleChange}
              min={1}
              max={stock}
              value={insertedProductQuantity}
            />
            <Button type="submit" variant="primary " onClick={addProductToCart}>
              Buy
            </Button>
          </Form.Group>
          {quantityError && (
            <Alert variant="danger">
              <span>{quantityError}</span>
            </Alert>
          )}
          {showAlert && (
            <Alert variant="success">
              <span>Product added to cart</span>
            </Alert>
          )}
        </CardBody>
      </Card>
    </>
  );
};
