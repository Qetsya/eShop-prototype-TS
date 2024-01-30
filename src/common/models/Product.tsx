export class Product {
  public name: string = "";
  public stock: number = 0;
  public price: number = 0;

  constructor(name: string, stock: number, price: number) {
    this.name = name;
    this.stock = stock;
    this.price = price;
  }
}
