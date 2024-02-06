import { Product } from "../models/Product";

export class CartProduct {
  public quantity: number = 0;
  public totalPrice: number = 0;
  // private id : number;
  public title: string;
  public stock: number;
  public price: number;
  public brand: string;
  public category: string;
  public description: string;
  public discountPercentage?: number;
  public images?: string[];
  public rating: number;
  public thumbnail: string;

  constructor(quantity: number, product: Product) {
    this.quantity = quantity;
    this.totalPrice = quantity * product.price;
    // this.id = product.id;
    this.stock = product.stock;
    this.title = product.title;
    this.price = product.price;
    this.brand = product.brand;
    this.category = product.category;
    this.description = product.description;
    this.discountPercentage = product.discountPercentage;
    this.images = product.images;
    this.rating = product.rating;
    this.thumbnail = product.thumbnail;

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
