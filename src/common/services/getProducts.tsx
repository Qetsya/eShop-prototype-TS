export const getProducts = (pages: number) => {
  return fetch(`https://dummyjson.com/products?limit=6&skip=${pages}`).then(
    (res) => {
      if (!res) throw new Error("Request failed");
      return res.json();
    }
  );
};
