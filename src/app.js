const { Server, HTTPError } = require("lambert-server");
const cors = require("cors")

async function main() {
		var corsOptions = {
		origin: "*",
		methods: ["GET", "POST", "DELETE", "PATCH"]
	};

	//@ts-ignore
	const server = new Server();
	server.app.use(cors(corsOptions));
	await server.registerRoutes(__dirname + "/routes/");
	await server.start();
}

main().catch(console.error)