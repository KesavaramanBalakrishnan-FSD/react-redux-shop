import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";

const ProductDetail = () => {
  const product = useSelector((state) => state.singleProduct);
  const { title, price, image, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async (id) => {
      const response = await axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .catch((err) => {
          console.log("Err:", err);
        });
      dispatch(selectedProduct(response.data));
    };

    if (productId && productId !== "") {
      fetchProduct(productId);
    }

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId, dispatch]);
  return (
    <div className="productDetail ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img
                  className="ui fluid image"
                  src={image}
                  alt={title || "Product Image"}
                />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <Link
                    to={`/product/${productId}`}
                    className="ui teal tag label"
                  >
                    ${price}
                  </Link>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
