import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllOrdersService } from "./findAllOrdersService";

class FindAllOrdersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const limit = res.locals.limit;
    const offset = res.locals.offset;

    const findAllOrdersService = container.resolve(FindAllOrdersService);
    const orders = await findAllOrdersService.execute(limit, offset);
    return res.send(orders);
  }
}

export default new FindAllOrdersController();
