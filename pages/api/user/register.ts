// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      switch (req.method) {
        case "POST":
          return registerUser(req, res);

        default:
          res.status(400).json({
            message: "Bad request",
          });
      }
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: "The password must be at least 6 characters",
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: "The name must be at least 3 characters",
    });
  }

  // if(email)

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, 10),
    name,
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Check logs server",
    });
  }

  const { _id, role } = newUser;
  const token = jwt.signToken(email, _id);

  return res.status(200).json({
    token,
    user: {
      email,
      name,
      role,
    },
  });
};
