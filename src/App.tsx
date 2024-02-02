import { useState } from "react";

import { Product } from "./common/models/Product";

import { Container, Row, Col} from "react-bootstrap";
import { NavbarBox } from "./common/components/Navbar/NavbarBox";
import { ProductCard } from "./common/components/ProductCard/ProductCard";
import { CartProduct } from "./common/models/CartProduct";
import { Cart } from "./common/models/Cart";

import { productList } from "./common/data/productList";



function App() {
  const newCart = new Cart();
  const [cart, setCart] = useState<Cart>(newCart);
  // const [showAlert, setShowAlert] = useState(false);

  const addProduct = (product: CartProduct) => {
    try {
      newCart.addProduct(product);
      setCart(newCart);
      
      console.log("CART IN MAIN", cart);
    } catch (e) {
      // setShowAlert(true);
      throw e;
    }
  };

  return (
    <>
      <NavbarBox cart={cart}/>
      <Container>
        <Row xs={2} md={3} lg={4} className="g-2">
          {productList?.map((item: Product) => {
            return (
              <Col key={item.name}>
                <ProductCard product={item} addedProduct={addProduct} />
              </Col>
            );
          })}
        </Row>
        {/* {showAlert && <Alert variant="success">Product added to cart</Alert>} */}
      </Container>
    </>
  );
}

export default App;
