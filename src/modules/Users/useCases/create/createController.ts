import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateService } from "./createService";

class CreateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const body = req.body;
    const createService = container.resolve(CreateService);
    await createService.execute(body);
    return res.sendStatus(201);
  }
}

export default new CreateController();
