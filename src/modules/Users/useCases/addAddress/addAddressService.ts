import { NotFoundError } from "@/helpers/errors/apiErrors";
import { Address } from "@/modules/Users/entities/Address";
import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class AddAddressService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(userId: string, address: Address): Promise<void> {
    const user = await this.userRepositories.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    await this.userRepositories.addNewAddress(userId, address);
  }
}
