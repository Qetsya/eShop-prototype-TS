import { useState } from "react";
import { NavbarBox } from "./common/components/Navbar/NavbarBox";
import { ShopPage } from "./pages/ShopPage/ShopPage";
import { CartPage } from "./pages/CartPage/CartPage";
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
      <NavbarBox cart={cart} />
      <ShopPage defaultCart={newCart} updateCart={getUpdatedCart} />
      <CartPage/>
    </>
  );
}

export default App;