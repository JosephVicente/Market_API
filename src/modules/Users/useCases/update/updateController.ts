import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateService } from "./updateService";

class UpdateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = res.locals.user;
    const data = req.body;
    const updateService = container.resolve(UpdateService);
    await updateService.execute(_id, data);
    return res.sendStatus(204);
  }
}

export default new UpdateController();
