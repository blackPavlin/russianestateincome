import { FastifyInstance, RegisterOptions } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { Telegram } from "telegraf";

import { Create } from "../schemas/form.schema";

export default (
	server: FastifyInstance,
	options: RegisterOptions,
	next: (err?: Error) => void,
): void => {
	const token = process.env.TOKEN;
	if (!token) {
		throw new Error("Missing telegram token");
	}
	const telegram = new Telegram(token);

	server.post<{ Body: FromSchema<typeof Create.body>}>("/", { schema: Create }, async (request) => {
		const { name, amount, phone, text } = request.body;
		const message = `
			ФИО: ${name}
			Сумма: ${amount}
			Телеграм: ${phone}
			О себе: ${text}
		`;

		await telegram.sendMessage("-1001761304423", message);

		return { message: "success" };
	});

    next();
}
