import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Alert,
} from "react-bootstrap";

import { Product } from "../../models/Product";
import { CartProduct } from "../../models/CartProduct";
import { useState } from "react";

import CartImage from "../../../assets/icons/cart3.svg";

interface ProductProps {
  product: Product;
  addedProduct(item: CartProduct): void;
}

export const ProductCard = ({ product, addedProduct }: ProductProps) => {
  const { title, stock, price, images } = product;

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
    }, 3000);
  };

  return (
    <>
      <Card style={{ maxWidth: "15rem", height: "19rem" }}>
        <div style={{ height: "6rem" }}>
          <Card.Img className="productCard-image" src={images[0]} />
        </div>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <div>
            <CardText className="mb-0">
              Price: <span>{price}Eur</span>
            </CardText>
            <CardText>
              Stock: <span>{stock}</span>
            </CardText>
          </div>
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
            <img
              src={CartImage}
              className="productCard-cart-image"
              onClick={addProductToCart}
              alt="add-to-cart"
            />
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
