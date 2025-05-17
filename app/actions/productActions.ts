
// import axios from 'axios';

// import { Dispatch } from 'redux';

// export const getProducts = () => async (dispatch: Dispatch) => {
//   try {
//     const { data } = await axios.get('http://localhost:5000/api/products');
//     dispatch({
//       type: 'FETCH_PRODUCTS_SUCCESS',
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: 'FETCH_PRODUCTS_FAILURE',
//       payload: error instanceof Error ? error.message : 'An unknown error occurred',
//     });
//   }
// };


import axios from 'axios';
import { Dispatch } from 'redux';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/products`);
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
