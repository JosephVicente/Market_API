import { Order } from "../entities/Order";

export interface IOrderRepository {
  create(data: Order): Promise<void>;
  findAll(limit: number, offset: number): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  remove(id: string): Promise<void>;
  updateStatus(id: string, concluded: boolean): Promise<void>;
}
