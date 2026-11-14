import { describe, expect, it } from "vitest";
import { buildApp } from "../../src/app.js";
import { createDatabase } from "../../src/infrastructure/database/database.js";

describe("Metrics API integration", () => {
  it("increments the counter after a successful order", async () => {
    const database = createDatabase(":memory:");
    const app = buildApp({ database });

    try {
      const before = await app.inject({
        method: "GET",
        url: "/metrics"
      });

      expect(before.statusCode).toBe(200);
      expect(before.json().orders_created_total).toBe(0);

      const order = await app.inject({
        method: "POST",
        url: "/orders",
        payload: {
          customer: "Cliente Métricas",
          customerType: "vip",
          items: [
            {
              product: "Produto teste",
              quantity: 2,
              unitPrice: 100
            }
          ]
        }
      });

      expect(order.statusCode).toBe(201);
      expect(order.json().total).toBe(180);

      const after = await app.inject({
        method: "GET",
        url: "/metrics"
      });

      expect(after.statusCode).toBe(200);
      expect(after.json().orders_created_total).toBe(1);
    } finally {
      await app.close();
    }
  });
});