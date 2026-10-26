import { isPortAvailable } from "./port-checker.js";

export async function findAvailablePort(
  startPort: number,
  maxPort: number,
): Promise<number | null> {
  for (let port = startPort; port <= maxPort; port++) {
    const available = await isPortAvailable(port);

    if (available) {
      return port;
    }
  }

  return null;
}