import axios from "../axios.js";
import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      await axios.get("/products/").then((res) => {
        setProducts(res.data);
      });
    };

    fetchProduct();
  }, []);
  return [products];
};

export default useProduct;
