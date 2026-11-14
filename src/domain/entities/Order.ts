
import type { CustomerType } from "../strategies/DiscountStrategies.js";
import { createDiscountStrategy } from "../strategies/DiscountStrategies.js";

export interface OrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderData {
  id: string;
  customer: string;
  customerType: CustomerType;
  items: OrderItem[];
  subtotal: number;
  total: number;
  createdAt: string;
}

export class Order {
  static create(
    id: string,
    customer: string,
    customerType: CustomerType,
    items: OrderItem[]
  ): OrderData {
    if (!customer.trim()) {
      throw new Error("Customer name is required");
    }

    if (items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    for (const item of items) {
      if (!item.product.trim()) {
        throw new Error("Product name is required");
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new Error("Quantity must be a positive integer");
      }

      if (!Number.isFinite(item.unitPrice) || item.unitPrice < 0) {
        throw new Error("Unit price must be non-negative");
      }
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const strategy = createDiscountStrategy(customerType);
    const total = strategy.apply(subtotal);

    return {
      id,
      customer,
      customerType,
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      total,
      createdAt: new Date().toISOString()
    };
  }
}
