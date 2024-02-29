import { useState } from "react";
import { ListGroup, Card, Form } from "react-bootstrap";

import { CartProduct } from "../../common/models/CartProduct";
import { Product } from "../../common/models/Product";
import { useList } from "../../common/hooks/useList";

import TrashImage from "../../assets/icons/trash.svg";

interface ProductProps {
  cartProduct: CartProduct;
  updateTotalCartPrice(): void;
  removeProductInCart(product: CartProduct): void;
  updateProduct(product: CartProduct): void;
}

export const CartItem = ({
  cartProduct,
  updateTotalCartPrice,
  removeProductInCart,
  updateProduct,
}: ProductProps) => {
  const { productList } = useList();
  const { id, title, stock, price, quantity, totalPrice } = cartProduct;
  const [insertedProductQuantity, setInsertedProductQuantity] =
    useState(quantity);

  let image = "https://cdn.dummyjson.com/product-images/-1/thumbnail.jpg";
  if (cartProduct.images) {
    image = cartProduct.images[0];
  }
  let productParent: Product;
  for (let product of productList) {
    if (product.id === cartProduct.id) productParent = product;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = Math.round(Number(e.target.value));

    if (newQuantity === 0) newQuantity = 1;
    if (newQuantity > stock) newQuantity = stock;

    e.target.value = String(newQuantity);

    let renewProductObject = Object.assign(
      new CartProduct(0, productParent),
      cartProduct
    );
    renewProductObject.updateQuantityAndPrice(newQuantity);
    updateProduct(renewProductObject);
    setInsertedProductQuantity(newQuantity);
    updateTotalCartPrice();
  };

  const removeProduct = () => {
    removeProductInCart(cartProduct);
  };

  return (
    <ListGroup.Item key={id} as="li" className="d-flex align-items-center">
      <div className="d-flex gap-3 align-items-center flex1">
        <Card.Img
          variant="left"
          src={`${image}`}
          style={{
            height: "100px",
            width: "100px",
            objectFit: "contain",
          }}
        />
        <p className="h4">{title}</p>
      </div>
      <div className="d-flex justify-content-between flex1">
        <span>{price}Eur</span>
        <div className="d-flex gap-1">
          <Form.Control
            style={{ width: "54px" }}
            name="quantity"
            type="number"
            size="sm"
            onChange={handleChange}
            min={1}
            max={stock}
            value={insertedProductQuantity}
          />
          <img
            src={TrashImage}
            onClick={removeProduct}
            alt="trash-icon"
            role="button"
          />
        </div>
        <span className="fw-bold">Eur {totalPrice}</span>
      </div>
    </ListGroup.Item>
  );
};
