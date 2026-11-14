
import type { DiscountStrategy } from "./DiscountStrategy.js";

export class RegularDiscount implements DiscountStrategy {
  apply(total: number): number {
    return total;
  }
}

export class VipDiscount implements DiscountStrategy {
  apply(total: number): number {
    return Math.round(total * 0.9 * 100) / 100;
  }
}

export class EmployeeDiscount implements DiscountStrategy {
  apply(total: number): number {
    return Math.round(total * 0.7 * 100) / 100;
  }
}

export type CustomerType = "regular" | "vip" | "employee";

export function createDiscountStrategy(
  type: CustomerType
): DiscountStrategy {
  switch (type) {
    case "regular":
      return new RegularDiscount();
    case "vip":
      return new VipDiscount();
    case "employee":
      return new EmployeeDiscount();
  }
}
