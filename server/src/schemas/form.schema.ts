export const Create = {
    body: {
        type: 'object',
        required: ['name', 'amount', 'phone'],
		properties: {
            name: { type: 'string' },
            amount: { type: 'number' },
            phone: { type: 'string' },
            text : { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            required: ['message'],
            properties: {
                message: { type: 'string' },
            },
        },
    },
} as const;
