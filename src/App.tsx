import { NavbarBox } from "./common/components/Navbar/NavbarBox";
import { ShopPage } from "./pages/ShopPage/ShopPage";
import { Cart } from "./common/models/Cart";

const newCart = new Cart();

function App() {
  return (
    <>
      <NavbarBox cart={newCart} />
      <ShopPage defaultCart={newCart} />
    </>
  );
}

export default App;
