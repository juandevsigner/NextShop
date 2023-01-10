import { createContext } from "react";
import { ICartProduct } from "../../interfaces/cart";

interface ContextProps {
  cart: ICartProduct[];

  //Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
