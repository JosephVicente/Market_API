import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAvatarUserService } from "./findAvatarUserService";

class FindAvatarUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const findAvatarUserService = container.resolve(FindAvatarUserService);
    const user = await findAvatarUserService.execute(id);
    return res.sendFile(user.image);
  }
}

export default new FindAvatarUserController();
