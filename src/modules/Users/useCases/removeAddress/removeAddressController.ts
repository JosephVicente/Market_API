import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveAddressressService } from "./removeAddressService";

class RemoveAddressController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = res.locals.user;
    const { idAddress } = req.params;
    const removeAddressService = container.resolve(RemoveAddressressService);
    await removeAddressService.execute(_id, idAddress);
    return res.sendStatus(204);
  }
}

export default new RemoveAddressController();
