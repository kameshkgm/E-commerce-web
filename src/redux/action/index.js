// action.js

export const ADD_ITEM = "ADDITEM";
export const DEL_ITEM = "DELITEM";
export const EMPTY_CART = "EMPTYCART"; 

export const addCart = (product) => {
  return {
    type: ADD_ITEM,
    payload: product,
  };
};

export const delCart = (product) => {
  return {
    type: DEL_ITEM,
    payload: product,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
