import { execFile } from "node:child_process";

export function findProcessIdByPort(
  port: number,
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const isWindows = process.platform === "win32";

    const command = isWindows ? "powershell.exe" : "lsof";

    const args = isWindows
      ? [
          "-NoProfile",
          "-Command",
          `Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique`,
        ]
      : ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"];

    execFile(command, args, (error, stdout) => {
      if (error) {
        if (!isWindows && "code" in error && error.code === 1) {
          resolve(null);
          return;
        }

        reject(error);
        return;
      }

      const output = stdout.trim();

      if (!output) {
        resolve(null);
        return;
      }

      const processId = Number(output.split(/\s+/)[0]);

      if (!Number.isInteger(processId) || processId <= 0) {
        reject(new Error("Invalid process ID returned by operating system"));
        return;
      }

      resolve(processId);
    });
  });
}