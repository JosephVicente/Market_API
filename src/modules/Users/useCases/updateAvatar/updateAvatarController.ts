import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarService } from "./updateAvatarService";

class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = res.locals.user;
    const { avatar } = req.body; //req.file?.path as string;
    const updateAvatarService = container.resolve(UpdateAvatarService);
    await updateAvatarService.execute(_id, avatar);
    return res.sendStatus(204);
  }
}
export default new UpdateAvatarController();
