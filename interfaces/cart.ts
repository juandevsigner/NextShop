import { ISizes } from "./";

export interface ICartProduct {
  _id: string;
  images: string;
  price: number;
  sizes: ISizes;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}
