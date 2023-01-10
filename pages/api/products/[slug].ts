import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database/intex";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProductSlug(req, res);
    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getProductSlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await db.disconnect();
  res.status(200).json(product);
};
