import { useMemo, useState } from "react";
import { useList } from "../../common/hooks/useList";
import { useSortFilterMethods } from "../../common/hooks/useSortFilterMethods";
import { getProductsByCategory } from "../../common/services/getProductsByCategory";

import { Product } from "../../common/models/Product";
import { CartProduct } from "../../common/models/CartProduct";
import { ProductCard } from "../../common/components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "../../common/components/ProductCard/ProductCardSkeleton";
import { Cart } from "../../common/models/Cart";
import { FilterSortContainer } from "./components/FilterSortContainer";
import { setCartToLocalStorage } from "../../common/utils/localStorage";

import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CartProps {
  defaultCart: Cart;
  updateCartBadge: (item: Cart) => void;
}

export const ShopPage = ({ defaultCart, updateCartBadge }: CartProps) => {
  const { loading, productList, error, handleLoad } = useList();
  const [list, setList] = useState<Product[]>(productList);
  const { sortMethods } = useSortFilterMethods();
  const [pages, setPages] = useState(6);
  const [showLoadButton, setShowLoadButton] = useState(true);

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

  const getFilterValue = async (value: string) => {
    if (value === "default") {
      setList(productList);
      setShowLoadButton(true);
    } else {
      try {
        const newList = await getProductsByCategory(value);
        setList(newList.products);
        setShowLoadButton(false);
      } catch (e) {
        throw e;
      }
    }
  };

  const loadPages = () => {
    const updatePage = pages + 6;
    setPages(updatePage);
    handleLoad(pages);
  };

  useMemo(() => {
    setList(productList);
  }, [productList]);

  return (
    <>
      {error && <Alert className="mx-3">{error}</Alert>}

      <Container>
        <FilterSortContainer
          setSortByType={getSortingValue}
          setFilterByCategory={getFilterValue}
        />
        <Row xs={2} md={3} lg={4} className="g-3">
          {list?.map((item: Product) => {
            return (
              <Col key={item.title}>
                <ProductCard product={item} addedProduct={addProduct} />
              </Col>
            );
          })}
          {loading && (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          )}
        </Row>
        {showLoadButton && (
          <Button className="bg-white text-black border-black p-0 my-3 mx-auto d-block">
            <Link
              preventScrollReset={true}
              to="/shop"
              onClick={loadPages}
              className="button-link"
            >
              Load more
            </Link>
          </Button>
        )}
      </Container>
    </>
  );
};
