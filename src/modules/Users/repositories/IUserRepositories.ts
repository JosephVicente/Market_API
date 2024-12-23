import { Product } from "modules/Products/entities/Product";
import { Address } from "../entities/Address";
import { User } from "../entities/User";

export interface IUserRepositories {
  create(body: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findAll(limit: number, offset: number): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  upadte(id: string, data: User): Promise<void>;
  delete(id: string): Promise<void>;
  addNewAddress(userId: string, address: Address): Promise<void>;
  removeAddress(userId: string, addressId: string): Promise<void>;
  findAddressById(addressId: string, userId: string): Promise<Address | null>;
  addFavoriteProduct(userId: string, productId: string): Promise<void>;
  findFavoriteProductById(
    productId: string,
    userId: string
  ): Promise<Product | null>;
  removeFavoriteProduct(userId: string, productId: string): Promise<void>;
  updateAvatar(id: string, avatar: string): Promise<void>;
}
