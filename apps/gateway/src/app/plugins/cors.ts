import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyCors);
});
