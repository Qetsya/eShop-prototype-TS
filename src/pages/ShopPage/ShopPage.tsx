import { useEffect, useState } from "react";
import { useList } from "../../common/hooks/useList";
import { useSortFilterMethods } from "../../common/hooks/useSortFilterMethods";
import { Product } from "../../common/models/Product";
import { CartProduct } from "../../common/models/CartProduct";
import { ProductCard } from "../../common/components/ProductCard/ProductCard";
import { Cart } from "../../common/models/Cart";
import { FilterSortContainer } from "./FilterSortContainer";

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

interface CartProps {
  defaultCart: Cart;
}

export const ShopPage = ({ defaultCart }: CartProps) => {
  const { loading, productList, error } = useList();
  const [list, setList] = useState<Product[]>(productList);
  const { sortMethods, filterMethods } = useSortFilterMethods();

  const addProduct = (product: CartProduct) => {
    try {
      defaultCart.addProduct(product);
      console.log("CART IN MAIN", defaultCart);
    } catch (e) {
      throw e;
    }
  };

  const getSortingValue = (value: string) => {
    //we cant update state by mutating array, so we create new array;
    let sortedList: Product[] = [];
    list.forEach((el) => {
      sortedList.push(el);
    });
    sortedList = sortedList.sort(sortMethods(value));
    setList(sortedList);
  };

  const getFilterValue = (value: string) => {
    const newList = productList.filter(filterMethods(value));
    setList(newList);
  };

  useEffect(() => {
    setList(productList);
  }, [productList]);

  return (
    <>
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
          <>
            <FilterSortContainer
              setSortByType={getSortingValue}
              setFilterByCategory={getFilterValue}
            />
            <Row xs={2} md={3} lg={4} className="g-3">
              {list?.map((item: Product) => {
                return (
                  <Col key={item.id}>
                    <ProductCard product={item} addedProduct={addProduct} />
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
