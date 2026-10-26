
import { isPortAvailable } from "./port-checker.js";
import { findProcessIdByPort } from "./process-finder.js";
import { launchApp } from "./app-launcher.js";
import { PORT_MANAGER_CONFIG } from "./config.js";

async function main(): Promise<void> {
  const START_PORT = PORT_MANAGER_CONFIG.startPort;
  const MAX_PORT = PORT_MANAGER_CONFIG.maxPort;

  if (
    !Number.isInteger(START_PORT) ||
    START_PORT < 1 ||
    START_PORT > MAX_PORT ||
    MAX_PORT > 65535
  ) {
    throw new Error("Invalid port configuration");
  }

  const occupiedPorts: {
    port: number;
    processId: number | null;
  }[] = [];

  let selectedPort: number | null = null;

  for (let port = START_PORT; port <= MAX_PORT; port++) {
    const available = await isPortAvailable(port);

    if (available) {
      selectedPort = port;
      break;
    }

    let processId: number | null = null;

    try {
      processId = await findProcessIdByPort(port);
    } catch {
      // PID lookup may fail because of OS permissions or missing tools.
    }

    occupiedPorts.push({ port, processId });
  }

  console.log("Port Manager starting...\n");

  if (occupiedPorts.length > 0) {
    console.log("Occupied ports:");

    for (const item of occupiedPorts) {
      console.log(
        `- Port ${item.port} | PID: ${item.processId ?? "Unknown"}`,
      );
    }

    console.log();
  }

  if (selectedPort === null) {
    console.error("No available port found.");
    process.exitCode = 1;
    return;
  }

  console.log(`Selected port: ${selectedPort}`);

  const child = launchApp(selectedPort);

  process.on("SIGINT", () => {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGTERM");
    }
  });
}

main().catch((error: unknown) => {
  console.error("Port Manager failed:", error);
  process.exitCode = 1;
});
