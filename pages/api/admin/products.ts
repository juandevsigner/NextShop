// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { db } from "../../../database";
import { IProduct } from "../../../interfaces";
import { Product } from "../../../models";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "PUT":
      return updateProducts(req, res);

    case "POST":
      return createProducts(req, res);

    default:
      res.status(400).json({ message: "Bad Request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();
  await db.disconnect();

  const updateProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  res.status(200).json(updateProducts);
};

const updateProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Id not valid" });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: "Must be a least 2 images" });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);

    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: "Product not found" });
    }

    //https://res.cloudinary.com/juandevsigner/image/upload/v1673992711/hf4twtrmg4yrwlmasxkx.webp
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        console.log(fileId, extension);
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Check console" });
  }
};

const createProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: "Must be a least 2 images" });
  }

  try {
    await db.connect();
    const productInDb = await Product.findOne({ slug: req.body.slug });
    if (productInDb) {
      await db.disconnect();
      return res.status(400).json({ message: "Slug already exist" });
    }
    const product = new Product(req.body);
    await product.save();

    res.status(200).json(product);

    await db.disconnect();
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: "Check console" });
  }
};
