import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";

@injectable()
export class DeleteService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepositories.findById(id);
    if (!user) throw new NotFoundError("User not found");

    await this.userRepositories.delete(id);
  }
}
