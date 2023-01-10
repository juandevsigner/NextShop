import { CartState } from "./CartProvider";
import { ICartProduct } from "../../interfaces";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Add Product"; payload: ICartProduct };

export const cartReducer = (state: CartState, action: CartActionType) => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
      };
    default:
      return state;
  }
};
