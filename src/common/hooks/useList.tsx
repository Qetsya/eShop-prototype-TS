import { useEffect, useState } from "react";
import { getProducts } from "../services/getProducts";
import { Product } from "../models/Product";

export const useList = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [error, setError] = useState("");

  const initialLoad = async () => {
    setLoading(true);
    try {
      const data = await getProducts(0);
      setProductList(data.products);
    } catch {
      setError("Could not load products. Please reload the page");
    }
    setLoading(false);
  };

  const handleLoad = async (pages:number) => {
    setLoading(true);
    try {
      const data = await getProducts(pages);
      const updateList = [...productList, ...data.products];
      setProductList(updateList);
    } catch {
      setError("Could not load products. Please reload the page");
    }
    setLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return { loading, productList, error, handleLoad };
};
