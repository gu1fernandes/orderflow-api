
import type Database from "better-sqlite3";
import type { OrderRepository } from "../../application/ports/OrderRepository.js";
import type { OrderData } from "../../domain/entities/Order.js";

type OrderRow = {
  id: string;
  customer: string;
  customer_type: OrderData["customerType"];
  items: string;
  subtotal: number;
  total: number;
  created_at: string;
};

export class SqliteOrderRepository implements OrderRepository {
  constructor(private readonly database: Database.Database) {}

  save(order: OrderData): void {
    this.database.prepare(`
      INSERT INTO orders (
        id, customer, customer_type, items,
        subtotal, total, created_at
      ) VALUES (
        @id, @customer_type_name, @customer_type, @items,
        @subtotal, @total, @created_at
      )
    `).run({
      id: order.id,
      customer_type_name: order.customer,
      customer_type: order.customerType,
      items: JSON.stringify(order.items),
      subtotal: order.subtotal,
      total: order.total,
      created_at: order.createdAt
    });
  }

  findById(id: string): OrderData | null {
    const row = this.database.prepare(
      "SELECT * FROM orders WHERE id = ?"
    ).get(id) as OrderRow | undefined;

    if (!row) return null;

    return {
      id: row.id,
      customer: row.customer,
      customerType: row.customer_type,
      items: JSON.parse(row.items),
      subtotal: row.subtotal,
      total: row.total,
      createdAt: row.created_at
    };
  }
}
