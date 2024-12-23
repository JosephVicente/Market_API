import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteService } from "./deleteService";

class DeleteController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = res.locals.user;
    const deleteService = container.resolve(DeleteService);
    await deleteService.execute(_id);
    return res.sendStatus(204);
  }
}

export default new DeleteController();
