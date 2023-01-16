// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { IOrder } from "../../../interfaces";
import { Order } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getOrder(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find()
    .sort({ createAt: "desc" })
    .lean()
    .populate("user", "name email");
  await db.disconnect();
  return res.status(200).json(orders);
};
