import { FastifyInstance, FastifyRequest } from 'fastify';
import { logger, messageBus } from '@ebd-connect/cqrs-framework';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/api/command',
    async (
      request: FastifyRequest<{
        Body: { command: string; businessCapability: string; payload: any };
      }>,
      reply
    ) => {
      const { command, payload, businessCapability } = request.body;
      if (command && payload) {
        try {
          return await messageBus.execute(
            Object.assign(payload, {
              constructor: { name: `${businessCapability}${command}` },
            })
          );
        } catch (e) {
          logger.error(`${e.name}: ${e.message}`);
          reply.code(500).send({ message: e.message });
        }
      }
    }
  );

}
