import { FastifyInstance, FastifyRequest } from 'fastify';
import { logger, messageBus } from '@ebd-connect/cqrs-framework';
import { pascalCase } from 'change-case';

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/api/query',
    async (
      request: FastifyRequest<{
        Body: { query: string; businessCapability: string; payload: any };
      }>,
      reply
    ) => {
      const { query, payload, businessCapability } = request.body;
      if (query ) {
        try {
          return await messageBus.query(
            Object.assign(payload, {
              constructor: { name: `${pascalCase(businessCapability)}.${pascalCase(query)}` },
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
