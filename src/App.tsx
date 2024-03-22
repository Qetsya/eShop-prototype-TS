import { useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Layout } from "./Layout";
import { routes } from "./common/routes/routes";
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

  const router = createBrowserRouter([
    {
      element: <Layout cart={cart} />,
      children: [
        { path: "/", element: <Navigate to={routes.shop} /> },
        {
          path: routes.shop,
          element: (
            <ShopPage defaultCart={newCart} updateCartBadge={getUpdatedCart} />
          ),
        },
        {
          path: routes.cart,
          element: <CartPage cart={newCart} updateCartBadge={getUpdatedCart} />,
        },
        { path: "/*", element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
