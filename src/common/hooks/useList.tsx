import { useEffect, useState } from "react";
import { getProducts } from "../services/getProducts";
import { Product } from "../models/Product";

export const useList = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [error, setError] = useState("");

  const handleLoad = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProductList(data.products);
    } catch {
      setError("Could not load products. Please reload the page");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return { loading, productList, error };
};
