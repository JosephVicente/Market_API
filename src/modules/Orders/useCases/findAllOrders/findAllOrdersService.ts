import { NotFoundError } from "@/helpers/errors/apiErrors";
import { Order } from "@/modules/Orders/entities/Order";
import { IOrderRepository } from "@/modules/Orders/repositories/IOrderRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllOrdersService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(limit: number, offset: number): Promise<Order[]> {
    const orders = await this.orderRepository.findAll(limit, offset);
    if (!orders.length) throw new NotFoundError("Orders not found!");
    return orders;
  }
}
