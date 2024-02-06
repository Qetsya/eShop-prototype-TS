import { CartProduct } from "./CartProduct";

export class Cart {
  cartProducts: CartProduct[] = [];
  totalCartPrice: number = 0;
  totalCartQuantity: number = 0;

  constructor() {}

  addProduct(productObject: CartProduct): void {
    let productExists = false;

    this.cartProducts.forEach((element) => {
      if (element.title === productObject.title) {
        let tryAddProduct = element.addQuantity(productObject.quantity);
        if (tryAddProduct) {
          productExists = true;
        } else {
          throw new Error("Stock is limited!");
        }
      }
    });

    if (!productExists) {
      this.cartProducts = [...this.cartProducts, productObject];
    }

    this.updateQuantityAndPrice();
  }

  updateQuantityAndPrice() {
    let newTotalCartPrice = 0;
    let newCartQuantity = 0;

    for (let product of this.cartProducts) {
      newCartQuantity += product.quantity;
      newTotalCartPrice += product.totalPrice;
    }

    this.totalCartPrice = newTotalCartPrice;
    this.totalCartQuantity = newCartQuantity;
  }
}
