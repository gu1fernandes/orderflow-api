
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { OrderRepository } from "../../application/ports/OrderRepository.js";
import { CreateOrder } from "../../application/use-cases/CreateOrder.js";
import { GetOrder } from "../../application/use-cases/GetOrder.js";

const createOrderSchema = z.object({
  customer: z.string().trim().min(1),
  customerType: z.enum(["regular", "vip", "employee"]),
  items: z.array(z.object({
    product: z.string().trim().min(1),
    quantity: z.number().int().positive(),
    unitPrice: z.number().finite().nonnegative()
  })).min(1)
}).strict();

export async function orderRoutes(
  app: FastifyInstance,
  repository: OrderRepository
) {
  const createOrder = new CreateOrder(repository);
  const getOrder = new GetOrder(repository);

  app.post("/orders", async (request, reply) => {
    const parsed = createOrderSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: "Validation Error",
        details: parsed.error.flatten()
      });
    }

    const order = createOrder.execute(parsed.data);

    return reply.status(201).send(order);
  });

  app.get<{ Params: { id: string } }>(
    "/orders/:id",
    async (request, reply) => {
      const order = getOrder.execute(request.params.id);

      if (!order) {
        return reply.status(404).send({
          error: "Order not found"
        });
      }

      return reply.send(order);
    }
  );
}
