import { useState } from "react";
import { useList } from "./common/hooks/useList";

import { Product } from "./common/models/Product";
import { CartProduct } from "./common/models/CartProduct";
import { Cart } from "./common/models/Cart";

import { NavbarBox } from "./common/components/Navbar/NavbarBox";
import { ProductCard } from "./common/components/ProductCard/ProductCard";
import {
  Container,
  Row,
  Col,
  Alert,
  Placeholder,
  Card,
  CardBody,
  CardTitle,
} from "react-bootstrap";

const newCart = new Cart();

function App() {

  const [cart, setCart] = useState<Cart>(newCart);

  const { loading, productList, error } = useList();

  const addProduct = (product: CartProduct) => {
    try {
      newCart.addProduct(product);
      setCart(newCart);

      console.log("CART IN MAIN", cart);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <NavbarBox cart={cart} />

      {error && <Alert>{error}</Alert>}

      <Container>
        {loading ? (
          <Card style={{ maxWidth: "15rem" }}>
            <CardBody>
              <CardTitle>
                <Placeholder xs={6} />
              </CardTitle>
              <CardTitle>
                <Placeholder xs={6} />
              </CardTitle>
            </CardBody>
          </Card>
        ) : (
          <Row xs={2} md={3} lg={4} className="g-2">
            {productList?.map((item: Product) => {
              return (
                <Col key={item.id}>
                  <ProductCard product={item} addedProduct={addProduct} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}

export default App;
