# Port Manager

A lightweight Node.js CLI tool that finds the first available TCP port and launches a sample application on it.

## Features

- Scans ports sequentially, starting from a configured port.
- Reports occupied ports and their process IDs when available.
- Stops scanning at the first available port.
- Launches the sample application using the selected port.
- Handles process launch errors and reports the child process exit status.
- Does not terminate unrelated processes.

## Requirements

- Node.js
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

## Configuration

Edit `src/config.ts` to configure the starting port and maximum port:

```ts
export const PORT_MANAGER_CONFIG = {
  startPort: 3000,
  maxPort: 65535,
};
```

## Build

Compile the TypeScript source files:

```bash
npx tsc
```

## Run

Start Port Manager:

```bash
node dist/index.js
```

The tool scans from the configured starting port, selects the first available port, and launches the sample application.

## Example Output

```text
Port Manager starting...

Occupied ports:
- Port 3000 | PID: 21384
- Port 3001 | PID: 3996

Selected port: 3002
Child process spawned for port 3002
Process ID: 10932
Sample app listening on port 3002
```

Process IDs and selected ports vary between runs.

## Project Structure

```text
src/
├── app-launcher.ts
├── config.ts
├── index.ts
├── port-checker.ts
├── port-scanner.ts
├── port-selector.ts
├── process-finder.ts
└── sampel-app.ts
```

## Platform Notes

- Windows process discovery uses PowerShell.
- Linux and macOS process discovery uses `lsof`, which must be installed.
- Cross-platform behavior has not yet been verified on Linux or macOS.
