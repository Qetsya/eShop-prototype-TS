import { Product } from "../models/Product";

export class CartProduct extends Product {
  public quantity: number = 0;
  public totalPrice: number = 0;

  constructor(quantity: number, product: Product) {
    super(product.name, product.stock, product.price);
    this.quantity = quantity;
    this.totalPrice = quantity * product.price;

    const validQuantity = quantity > this.stock ? this.stock : quantity;

    this.updateQuantityAndPrice(validQuantity);
  }

  addQuantity(quantity: number) {
    const newQuantity = this.quantity + quantity;

    if (newQuantity > this.stock) {
      return false;
    } else {
      this.quantity = newQuantity;
      this.updateQuantityAndPrice(this.quantity);
      return true;
    }
  }

  minusQuantity() {
    this.quantity = -1;
  }

  updateQuantityAndPrice(validQuantity: number) {
    this.quantity = validQuantity;
    this.totalPrice = this.quantity * this.price;
  }
}
