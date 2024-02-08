import { Product } from "../models/Product";

interface Methods {
  (type: string): any;
}

export const useSortFilterMethods = () => {
  const sortMethods: Methods = (type: string) => {
    switch (type) {
      case "default":
        return () => null;

      case "popularity":
        return (a: Product, b: Product) => (a.rating > b.rating ? -1 : 1);

      case "priceLow":
        return (a: Product, b: Product) => (a.price > b.price ? 1 : -1);

      case "priceHigh":
        return (a: Product, b: Product) => (a.price > b.price ? -1 : 1);

      default:
        return () => null;
    }
  };

  const filterMethods = (type: string) => {
    if (type === "default") {
      return (product: Product) => product;
    } else {
      return (product: Product) => product.category === type;
    }
  };

  return { sortMethods, filterMethods };
};
