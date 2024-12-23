import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddAddressService } from "./addAddressService";

class AddAddressController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = res.locals.user;
    const data = req.body;
    const addAddressService = container.resolve(AddAddressService);
    await addAddressService.execute(_id, data);
    return res.sendStatus(201);
  }
}

export default new AddAddressController();
