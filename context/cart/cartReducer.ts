import { CartState, ShippingAddress } from "./CartProvider";
import { ICartProduct } from "../../interfaces";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Update products in cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Change products quantity"; payload: ICartProduct }
  | { type: "[Cart] - Remove products in cart"; payload: ICartProduct }
  | { type: "[Cart] - Update Address"; payload: ShippingAddress }
  | {
      type: "[Cart] - Update order sumary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | { type: "[Cart] - LoadAddres from Cookies"; payload: ShippingAddress };

export const cartReducer = (state: CartState, action: CartActionType) => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };
    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Change products quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.sizes !== action.payload.sizes) return product;
          product.quantity = action.payload.quantity;
          return action.payload;
        }),
      };
    case "[Cart] - Remove products in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.sizes === action.payload.sizes
            )
        ),
      };
    case "[Cart] - Update order sumary":
      return {
        ...state,
        ...action.payload,
      };

    case "[Cart] - LoadAddres from Cookies":
    case "[Cart] - Update Address":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
