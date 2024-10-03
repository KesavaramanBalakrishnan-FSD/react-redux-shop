import { combineReducers } from "redux";

import { productReducer, selectedProductReducer } from "./productReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  singleProduct: selectedProductReducer,
});

export default reducers;
