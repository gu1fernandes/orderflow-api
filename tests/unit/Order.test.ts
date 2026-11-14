
import { describe, it, expect } from "vitest";
import { Order } from "../../src/domain/entities/Order.js";

describe("Order domain", () => {
  const items = [
    { product: "Keyboard", quantity: 2, unitPrice: 100 }
  ];

  it("calculates regular order total", () => {
    const order = Order.create("1", "Ana", "regular", items);
    expect(order.total).toBe(200);
  });

  it("applies VIP discount", () => {
    const order = Order.create("2", "Bruno", "vip", items);
    expect(order.total).toBe(180);
  });

  it("applies employee discount", () => {
    const order = Order.create("3", "Carlos", "employee", items);
    expect(order.total).toBe(140);
  });

  it("rejects empty orders", () => {
    expect(() =>
      Order.create("4", "Ana", "regular", [])
    ).toThrow("Order must contain at least one item");
  });

  it("rejects invalid quantities", () => {
    expect(() =>
      Order.create("5", "Ana", "regular", [
        { product: "Mouse", quantity: -1, unitPrice: 50 }
      ])
    ).toThrow("Quantity must be a positive integer");
  });

  it("rejects negative prices", () => {
    expect(() =>
      Order.create("6", "Ana", "regular", [
        { product: "Mouse", quantity: 1, unitPrice: -10 }
      ])
    ).toThrow("Unit price must be non-negative");
  });
});
