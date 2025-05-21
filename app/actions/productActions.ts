
import axios from 'axios';

import { Dispatch } from 'redux';

export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/products');
    dispatch({
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILURE',
      payload: error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

