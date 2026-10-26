
import { spawn } from "node:child_process";

export function launchApp(port: number) {
  const child = spawn(
    process.execPath,
    ["dist/sampel-app.js"],
    {
      env: {
        ...process.env,
        PORT: String(port),
      },
      stdio: "inherit",
    },
  );

  child.on("spawn", () => {
    console.log(`Child process spawned for port ${port}`);
    console.log(`Process ID: ${child.pid}`);
  });

  child.on("error", (error: Error) => {
    console.error("Failed to launch app:", error.message);
    process.exitCode = 1;
  });

  child.on("exit", (code, signal) => {
    if (code === 0) {
      console.log("App exited successfully.");
      return;
    }

    if (signal) {
      console.log(`App stopped by signal: ${signal}`);
      return;
    }

    console.error(`App exited with error code: ${code}`);
    process.exitCode = 1;
  });

  return child;
}
