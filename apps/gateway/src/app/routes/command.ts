import { FastifyInstance, FastifyRequest } from 'fastify';
import { logger, messageBus } from '@ebd-connect/cqrs-framework';
import { pascalCase } from 'change-case';

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
              constructor: { name: `${pascalCase(businessCapability)}.${pascalCase(command)}` },
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
