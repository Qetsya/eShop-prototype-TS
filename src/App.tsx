import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./common/routes/routes";
import { NavbarBox } from "./common/components/Navbar/NavbarBox";
import { ShopPage } from "./pages/ShopPage/ShopPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Cart } from "./common/models/Cart";

const newCart = new Cart();

function App() {
  const [cart, setCart] = useState(newCart);

  const getUpdatedCart = (cart: Cart) => {
    //changing object reference to update NavbarBox
    const copy = Object.assign({}, cart);
    setCart(copy);
  };

  return (
    <>
      <NavbarBox updateCartBadge={cart} />
      <Routes>
        <Route path="/" element={<Navigate to={routes.shop} />} />
        <Route
          path={routes.shop}
          element={
            <ShopPage defaultCart={newCart} updateCartBadge={getUpdatedCart} />
          }
        />
        <Route path={routes.cart} element={<CartPage cart={newCart} />} />
        <Route path={routes.notFound} element={<PageNotFound/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
