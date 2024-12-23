import { User } from "@/modules/Users/entities/User";
import bcrypt from "bcrypt";
import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";
import { ConflictError } from "@/helpers/errors/apiErrors";

@injectable()
export class CreateService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(body: User): Promise<void> {
    const hashPassword = await bcrypt.hash(body.password, 10);

    const userExists = await this.userRepositories.findByEmail(body.email);
    if (userExists) throw new ConflictError("User already exists");

    await this.userRepositories.create({ ...body, password: hashPassword });
  }
}
