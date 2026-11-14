
import { describe, it, expect } from "vitest";
import { buildApp } from "../../src/app.js";
import { createDatabase } from "../../src/infrastructure/database/database.js";

describe("Orders API integration", () => {
  it("creates and retrieves an order", async () => {
    const database = createDatabase(":memory:");
    const app = buildApp({ database });

    try {
      const response = await app.inject({
        method: "POST",
        url: "/orders",
        payload: {
          customer: "Ana",
          customerType: "vip",
          items: [
            {
              product: "Teclado",
              quantity: 2,
              unitPrice: 100
            }
          ]
        }
      });

      expect(response.statusCode).toBe(201);

      const created = response.json();

      expect(created.subtotal).toBe(200);
      expect(created.total).toBe(180);
      expect(created.id).toBeDefined();

      const getResponse = await app.inject({
        method: "GET",
        url: `/orders/${created.id}`
      });

      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.json()).toEqual(created);
    } finally {
      await app.close();
    }
  });

  it("returns 400 for invalid orders", async () => {
    const app = buildApp({
      database: createDatabase(":memory:")
    });

    try {
      const response = await app.inject({
        method: "POST",
        url: "/orders",
        payload: {
          customer: "Ana",
          customerType: "vip",
          items: []
        }
      });

      expect(response.statusCode).toBe(400);
    } finally {
      await app.close();
    }
  });

  it("returns 404 for nonexistent orders", async () => {
    const app = buildApp({
      database: createDatabase(":memory:")
    });

    try {
      const response = await app.inject({
        method: "GET",
        url: "/orders/nonexistent-id"
      });

      expect(response.statusCode).toBe(404);
    } finally {
      await app.close();
    }
  });
});
