import { Cart } from "../models/Cart";

export const setCartToLocalStorage = (key: string, value: Cart) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getCartFromLocalStorage = (key: string) => {
  let item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : "";
};

export const emptyCartInLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
}
