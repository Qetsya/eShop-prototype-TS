export const getProductsByCategory = (category: string) => {
  return fetch(`https://dummyjson.com/products/category/${category}`).then(
    (res) => {
      if (!res) throw new Error("Request failed");
      return res.json();
    }
  );
};
