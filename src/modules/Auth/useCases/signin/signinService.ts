import { Auth } from "@/modules/Auth/entities/Auth";
import { IAuthRepositories } from "@/modules/Auth/repositories/IAuthRepositories";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { ConflictError } from "@/helpers/errors/apiErrors";
import { ObjectId } from "mongodb";

@injectable()
export class SigninService {
  constructor(
    @inject("AuthRepositories")
    private authRepositories: IAuthRepositories
  ) {}

  async execute(data: Auth) {
    const user = await this.authRepositories.findUserByEmail(data.email);
    if (!user) throw new ConflictError("Email or password invalid");

    const passwordOk = bcrypt.compareSync(data.password, user.password);
    if (!passwordOk) throw new ConflictError("Email or password invalid");

    return this.authRepositories.generateToken(user._id as ObjectId);
  }
}
