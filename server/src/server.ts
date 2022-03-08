import fastify from "fastify";
import fastifyCors from 'fastify-cors';

import FormController from "./controllers/form.controller";
import BotController from "./controllers/bot.controller";

export default function createNewServer() {
    const server = fastify({
        logger: {
            level: process.env.NODE_ENV === "development" ? "info" : "error",
        },
        ignoreTrailingSlash: true,
    });
    
    server.register(fastifyCors, {
        origin: process.env.NODE_ENV === "development" ? "*" : "https://russianestateincome.com/",
    });
    
    server.register(FormController, { prefix: "/api/form" });
    server.register(BotController, { prefix: "/api/bot" });

    return server;
}
