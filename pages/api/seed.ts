import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDataba } from "../../database/intex";
import { Product } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Dont have access to Api" });
  }
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(seedDataba.initialData.products);
  await db.disconnect();
  res.status(200).json({ message: "succes process" });
}
