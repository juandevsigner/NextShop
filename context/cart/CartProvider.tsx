import { FC, useEffect, useReducer } from "react";
import { ICartProduct } from "../../interfaces/cart";
import Cookie from "js-cookie";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);

    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.sizes === product.sizes
    );

    if (!productInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const updateProduct = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.sizes !== product.sizes) return p;

      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updateProduct,
    });
  };

  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
