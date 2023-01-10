import { createContext } from "react";
import { ICartProduct } from "../../interfaces/cart";

interface ContextProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as ContextProps);
