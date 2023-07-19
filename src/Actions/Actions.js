import axios from "axios";
import { Fail, Success } from "../Redux/ProductSlice";
import { categoryFail, categorySuccess } from "../Redux/CategorySlice";

export const getProducts = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      "https://fakestoreapi.com/products",
      config
    );

    dispatch(Success(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(Fail(message));
  }
};


export const getCategoryList = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      "https://fakestoreapi.com/products/categories",
      config
    );

    dispatch(categorySuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(categoryFail(message));
  }
};