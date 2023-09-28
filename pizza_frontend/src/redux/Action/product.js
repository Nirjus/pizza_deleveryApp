import axios from "axios";
import { server } from "../../server";

export const createProduct =
  (name, description, stock, price, category, image) => async (dispatch) => {
    try {
      dispatch({
        type: "createProductRequest",
      });
      const { data } = await axios.post(
        `${server}/product/create`,
        {
          name,
          description,
          stock,
          price,
          category,
          image,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "createProductSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "createProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductRequest",
    });
    const { data } = await axios.get(`${server}/product`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllProductSuccess",
      payload: data.payload.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getProduct = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductRequest",
    });
    const { data } = await axios.get(`${server}/product/${slug}`, {
      withCredentials: true,
    });
    dispatch({
      type: "getProductSuccess",
      payload: data.payload,
    });
  } catch (error) {
    dispatch({
      type: "getProductFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllProductsForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getProductsForAdminRequest",
    });
    const { data } = await axios.get(`${server}/product/admin`, {
      withCredentials: true,
    });
    dispatch({
      type: "getProductsForAdminSuccess",
      payload: data.payload.products,
    });
  } catch (error) {
    dispatch({
      type: "getProductsForAdminFail",
      payload: error.response.data.message,
    });
  }
};
export const updateProductAdmin = (slug,name, description, stock, price, category, image) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductRequest",
    });
    const { data } = await axios.put(`${server}/product/update/${slug}`,{
      name, description, stock, price, category, image
    }, {
      withCredentials:true,
    });
    dispatch({
      type: "updateProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProductFail",
      payload: error.response.data.message,
    });
  }
};