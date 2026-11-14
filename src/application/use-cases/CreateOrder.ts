
import { randomUUID } from "node:crypto";
import { Order, type OrderItem } from "../../domain/entities/Order.js";
import type { CustomerType } from "../../domain/strategies/DiscountStrategies.js";
import type { OrderRepository } from "../ports/OrderRepository.js";

export interface CreateOrderInput {
  customer: string;
  customerType: CustomerType;
  items: OrderItem[];
}

export class CreateOrder {
  constructor(private readonly repository: OrderRepository) {}

  execute(input: CreateOrderInput) {
    const order = Order.create(
      randomUUID(),
      input.customer,
      input.customerType,
      input.items
    );

    this.repository.save(order);

    return order;
  }
}
