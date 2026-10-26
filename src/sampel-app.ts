import { createServer } from "node:net";

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port");
}

const server = createServer((socket) => {
  socket.end("Port Manager sample app\n");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Sample app listening on port ${port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  console.error("Sample app failed:", error.message);
  process.exitCode = 1;
});