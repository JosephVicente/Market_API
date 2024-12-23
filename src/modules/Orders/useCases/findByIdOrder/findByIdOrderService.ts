import { NotFoundError } from "@/helpers/errors/apiErrors";
import { Order } from "@/modules/Orders/entities/Order";
import { IOrderRepository } from "@/modules/Orders/repositories/IOrderRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found!");
    return order;
  }
}
