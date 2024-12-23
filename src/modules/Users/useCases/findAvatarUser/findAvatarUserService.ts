import { NotFoundError } from "@/helpers/errors/apiErrors";
import { User } from "@/modules/Users/entities/User";
import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAvatarUserService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepositories.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
