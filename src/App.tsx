import { Product } from "./common/models/Product";

import { Container, Row, Col } from "react-bootstrap";
import { ProductCard } from "./common/components/ProductCard/ProductCard";
import { CartProduct } from "./common/models/CartProduct";

import { productList } from "./common/data/productList";
import { Cart } from "./common/models/Cart";

function App() {
  const cart = new Cart();

  const addProduct = (product: CartProduct) => {
    try {
      cart.addProduct(product);
      console.log("CART ", cart);
    } catch (e) {
      throw e;
    }
  };

  return (
    <Container>
      <Row xs={2} md={4} className="g-2">
        {productList?.map((item: Product) => {
          return (
            <Col key={item.name}>
              <ProductCard product={item} addedProduct={addProduct} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
