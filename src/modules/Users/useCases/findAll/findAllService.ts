import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { NotFoundError } from "@/helpers/errors/apiErrors";

@injectable()
export class FindAllService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(limit: number, offset: number): Promise<User[]> {
    const users = await this.userRepositories.findAll(limit, offset);
    return users;
  }
}
