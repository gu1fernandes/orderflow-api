
import type { OrderData } from "../../domain/entities/Order.js";

export interface OrderRepository {
  save(order: OrderData): void;
  findById(id: string): OrderData | null;
}
