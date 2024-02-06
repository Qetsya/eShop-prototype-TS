export const getProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => {
    if (!res) throw new Error("Request failed");
    return res.json();
  });
};
