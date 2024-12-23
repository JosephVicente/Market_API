import { Product } from "@/modules/Products/entities/Product";
import ProductSchema from "@/modules/Products/schemas/ProductSchema";
import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";
import { dirname, join } from "path";
import fs from "fs";
import bcrypt from "bcrypt";

export function createPathAndImage() {
  const __dirname = dirname(process.cwd());
  const folderPath = join(__dirname, "images");
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
  const imageName = "testImage.jpg";
  const imageContent = "";
  const imagePath = join(folderPath, imageName);
  fs.writeFileSync(imagePath, imageContent);

  return imagePath;
}

export function newUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    image: createPathAndImage(),
    admin: faker.datatype.boolean(),
  };
}

export const userToCreateDb = newUser();

export async function createUserDb() {
  const userToCreateDb = newUser();
  const userPasswordHashed = {
    ...userToCreateDb,
    password: await bcrypt.hash(userToCreateDb.password, 10),
  };
  const userDb = await UserSchema.create(userPasswordHashed);
  return userDb;
}

export function mockCreateUserDb() {
  return {
    name: userToCreateDb.name,
    email: userToCreateDb.email,
    password: bcrypt.hashSync(userToCreateDb.password, 10),
    image: userToCreateDb.image,
    admin: userToCreateDb.admin,
    created_at: new Date(),
    _id: newRandomObjectId(),
    addresses: [],
    favorite_products: [],
  };
}

export function newInvalidUserSchema() {
  const user = newUser();
  return { ...user, name: 12 };
}

export function newInvalidToken() {
  return faker.string.uuid();
}

export function newRandomObjectId() {
  return new ObjectId();
}

export function newUserWithoutPassword() {
  const user = newUser();
  const { password, ...newUserWithoutPassword } = user;
  return newUserWithoutPassword;
}

export async function deleteUserDb(user: User) {
  await UserSchema.deleteOne({ _id: user._id });
}

export function newAddress() {
  return {
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    complement: faker.location.buildingNumber(),
    zipcode: faker.location.zipCode(),
  };
}

export function newInvalidAddressSchema() {
  const address = newAddress();
  return { ...address, number: 12 };
}

export async function createUserAddressDb(user: User) {
  const address = newAddress();
  await UserSchema.updateOne(
    {
      _id: user._id,
    },
    {
      $push: {
        addresses: address,
      },
    }
  );
}

export async function findByIdUser(user: User) {
  return await UserSchema.findById(user._id);
}

export async function createProductDb() {
  const product = await ProductSchema.create({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    unit_price: faker.commerce.price({ min: 100, max: 200000 }),
    image: createPathAndImage(),
    bar_code: faker.number.int(100),
  });

  return product;
}

export async function addFavProductUserDb(user: User, product: Product) {
  await UserSchema.updateOne(
    {
      _id: user._id,
    },
    {
      $push: {
        favorite_products: {
          _id: product._id,
        },
      },
    }
  );
}
