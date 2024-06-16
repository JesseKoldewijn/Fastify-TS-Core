import fastify, { type FastifyInstance } from "fastify";

const envToLogger = {
	development: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "hostname",
			},
		},
	},
	production: true,
	test: false,
};

const environment = (process.env.NODE_ENV ||
	"development") as keyof typeof envToLogger;

const server: FastifyInstance = fastify({ logger: envToLogger[environment] });

server.get("/", async (request, reply) => {
	reply.send({ hello: "world" });
});

server.listen({ port: 8080 }, (err, _address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
});
