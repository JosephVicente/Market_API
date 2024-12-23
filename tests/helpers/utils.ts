import ProductSchema from "@/modules/Products/schemas/ProductSchema";
import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import jwt from "jsonwebtoken";
import fs from "fs";
import { createPathAndImage } from "../factories/users.factories";

export async function cleanDatabase() {
  await UserSchema.deleteMany({});
  await ProductSchema.deleteMany({});
  fs.unlink(createPathAndImage(), () => {});
}

export function generateToken(user: User): string {
  const secret = process.env.SECRET_JWT as string;
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });
  return token;
}
