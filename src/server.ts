
import { createServer } from "node:net";

const PORT = 3000;

const server = createServer();

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    return;
  }

  console.error("Server error:", error.message);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`TCP server is listening on port ${PORT}`);
});
