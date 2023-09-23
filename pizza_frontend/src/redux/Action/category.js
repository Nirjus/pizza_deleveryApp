import axios from "axios";
import { server } from "../../server";

export const createCategory =
  (name, image) => async (dispatch) => {
    try {
      dispatch({
        type: "createCategoryRequest",
      });
      const { data } = await axios.post(
        `${server}/api/category/create`,
        {
          name,
          image,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "createCategorySuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "createCategoryFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoryRequest",
    });
    const { data } = await axios.get(`${server}/api/category`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllCategorySuccess",
      payload: data.payload,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoryFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllCategoryForAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getCategoryForAdminRequest",
    });
    const { data } = await axios.get(`${server}/api/category/admin`, {
      withCredentials: true,
    });
    dispatch({
      type: "getCategoryForAdminSuccess",
      payload: data.payload,
    });
  } catch (error) {
    dispatch({
      type: "getCategoryForAdminFail",
      payload: error.response.data.message,
    });
  }
};
export const updateCategoryAdmin = (oldName, newName,image) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCategoryRequest",
    });
    const { data } = await axios.put(`${server}/api/category/update`,{
        oldName, newName,image
    }, {
      withCredentials:true,
    });
    dispatch({
      type: "updateCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCategoryFail",
      payload: error.response.data.message,
    });
  }
};