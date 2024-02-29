import { useEffect, useState } from "react";
import { useList } from "../../common/hooks/useList";
import { useSortFilterMethods } from "../../common/hooks/useSortFilterMethods";
import { Product } from "../../common/models/Product";
import { CartProduct } from "../../common/models/CartProduct";
import { ProductCard } from "../../common/components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "../../common/components/ProductCard/PructCardSkeleton";
import { Cart } from "../../common/models/Cart";
import { FilterSortContainer } from "./FilterSortContainer";
import { setCartToLocalStorage } from "../../common/utils/localStorage";

import { Container, Row, Col, Alert } from "react-bootstrap";

interface CartProps {
  defaultCart: Cart;
  updateCartBadge: (item: Cart) => any;
}

export const ShopPage = ({ defaultCart, updateCartBadge }: CartProps) => {
  const { loading, productList, error } = useList();
  const [list, setList] = useState<Product[]>(productList);
  const { sortMethods, filterMethods } = useSortFilterMethods();

  const addProduct = (product: CartProduct) => {
    try {
      defaultCart.addProduct(product);
      setCartToLocalStorage("cart", defaultCart);
      updateCartBadge(defaultCart);
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
        <FilterSortContainer
          setSortByType={getSortingValue}
          setFilterByCategory={getFilterValue}
        />
        {loading ? (
          <Row xs={2} md={3} lg={4} className="gap-3">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </Row>
        ) : (
          <Row xs={2} md={3} lg={4} className="g-3">
            {list?.map((item: Product) => {
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
};
