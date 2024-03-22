import { NavbarBox } from "./common/components/Navbar/NavbarBox";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Cart } from "./common/models/Cart";

interface Props {
  cart: Cart;
}

export const Layout = ({ cart }: Props) => {
  return (
    <>
      <NavbarBox updateCartBadge={cart} />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
