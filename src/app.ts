import Fastify from "fastify";
import type Database from "better-sqlite3";
import { createDatabase } from "./infrastructure/database/database.js";
import { SqliteOrderRepository } from "./infrastructure/repositories/SqliteOrderRepository.js";
import { orderRoutes } from "./presentation/routes/orderRoutes.js";

export interface AppOptions {
  database?: Database.Database;
}

export function buildApp(options: AppOptions = {}) {
  const app = Fastify({ logger: true });

  const database = options.database ?? createDatabase();
  const repository = new SqliteOrderRepository(database);

  let successfulOrders = 0;

  app.addHook("onClose", async () => {
    database.close();
  });

  app.get("/health", async () => ({
    status: "ok",
    service: "orderflow-api"
  }));

  app.get("/metrics", async () => ({
    orders_created_total: successfulOrders
  }));

  app.addHook("onResponse", async (request, reply) => {
    if (
      request.method === "POST" &&
      request.url === "/orders" &&
      reply.statusCode === 201
    ) {
      successfulOrders++;
    }
  });

  app.register(async (instance) => {
    await orderRoutes(instance, repository);
  });

  return app;
}