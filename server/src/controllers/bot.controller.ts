import fs from 'fs';
import path from 'path';
import { FastifyInstance, RegisterOptions } from "fastify";


export default (
	server: FastifyInstance,
	options: RegisterOptions,
	next: (err?: Error) => void,
): void => {
    const logger = fs.createWriteStream(path.join(__dirname, '../../log.txt'), {
        flags: 'a',
    })

    server.post('/', async (request, reply) => {
        const updates: any = request.body;

        if (updates.message && !updates.message.is_bot) {
            const { id, first_name, last_name, username } = updates.message;

            logger.write(`${id} ${first_name} ${last_name} ${username}\n`);
        }

        reply.code(200);
    });
}
