import { NotFoundError } from "@/helpers/errors/apiErrors";
import { deleteFile } from "@/helpers/upload/deleteFile";
import { IUserRepositories } from "@/modules/Users/repositories/IUserRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateAvatarService {
  constructor(
    @inject("UserRepositories")
    private userRepositories: IUserRepositories
  ) {}

  async execute(id: string, avatar: string) {
    const user = await this.userRepositories.findById(id);
    if (!user) throw new NotFoundError("User not found!");

    if (user.image) await deleteFile(user.image);

    await this.userRepositories.updateAvatar(id, avatar);
  }
}
