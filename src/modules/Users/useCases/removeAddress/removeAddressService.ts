import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class RemoveAddressressService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(userId: string, addressId: string): Promise<void> {
    const user = await this.userRepositories.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const address = await this.userRepositories.findAddressById(
      addressId,
      userId
    );
    if (!address) throw new NotFoundError("Address not found");

    await this.userRepositories.removeAddress(userId, addressId);
  }
}
