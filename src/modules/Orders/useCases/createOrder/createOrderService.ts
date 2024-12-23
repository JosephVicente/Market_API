import { Order } from "../../entities/Order";
import { IOrderRepository } from "../../repositories/IOrderRepositories";
import { ObjectId } from "mongodb";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(_id: ObjectId, data: Order): Promise<void> 
  {
    const order = { ...data, user_id: _id };
    await this.orderRepository.create(order);
  }
}
