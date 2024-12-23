import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCartService } from "./createCartService";

class CreateCartController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { _id } = res.locals.user;
    const body = req.body;
    const creatCartService = container.resolve(CreateCartService);
    await creatCartService.execute(_id, body);
    return res.sendStatus(201);
  }
}

export default new CreateCartController();
