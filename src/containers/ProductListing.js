import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../App.css";
import ProductComponent from "./ProductComponent";
import { setProducts } from "../redux/actions/productActions";

const ProductListing = () => {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err", err);
      });

    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  });

  return (
    <div className="products ui grid container">
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
