import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_ERROR, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_ERROR, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_ERROR } from '../constants/productConstants';
import axios from 'axios';
import Axios from "axios";


const listProducts = () => async (dispatch) => {
   try {

     dispatch({ type: PRODUCT_LIST_REQUEST });
     const { data } = await axios.get("/api/products");
     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
   } 
   catch (error) {

     dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message });   
   }   
}

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { userSignin: { userInfo } } = getState();
    if(!product._id){
      const { data } = await Axios.post("/api/products", product, 
    { headers: { Authorization: 'Bearer' + userInfo.token }
  });
  dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  }
  else{
    const { data } = await Axios.put("/api/products/" + product._id, product, 
    { headers: { Authorization: 'Bearer' + userInfo.token }
  });
  dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  }
  }
  catch (error) {
    dispatch({ type: PRODUCT_SAVE_ERROR, payload: error.message });
  }

}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("/api/products/"+productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_ERROR, payload: error.message });
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete("/api/products/"+productId,
      { headers: {
        Authorization: 'Bearer' + userInfo.token
      }
    });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
      dispatch({ type: PRODUCT_DELETE_ERROR, payload: error.message });
  }
}



export { listProducts, detailsProduct, saveProduct, deleteProduct }