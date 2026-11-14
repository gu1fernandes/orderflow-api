
import type { OrderRepository } from "../ports/OrderRepository.js";

export class GetOrder {
  constructor(private readonly repository: OrderRepository) {}

  execute(id: string) {
    return this.repository.findById(id);
  }
}
