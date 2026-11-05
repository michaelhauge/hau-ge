import readline from "node:readline";

/** Terminal I/O behind an interface so the interactive commands are testable. */
export interface IO {
  /** Resolves null at end of input (Ctrl-D). */
  ask(question: string): Promise<string | null>;
  print(line?: string): void;
  write(text: string): void;
  close(): void;
}

function terminalIO(): IO {
  let rl: readline.Interface | null = null;
  let closed = false;
  const get = () => {
    if (!rl) {
      rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.on("close", () => {
        closed = true;
      });
    }
    return rl;
  };
  return {
    ask(question) {
      return new Promise((resolve) => {
        if (closed) return resolve(null);
        const r = get();
        const onClose = () => resolve(null);
        r.once("close", onClose);
        r.question(question, (answer) => {
          r.off("close", onClose);
          resolve(answer);
        });
      });
    },
    print(line = "") {
      process.stdout.write(line + "\n");
    },
    write(text) {
      process.stdout.write(text);
    },
    close() {
      rl?.close();
    },
  };
}

let io: IO | null = null;

export function setIO(x: IO | null): void {
  io = x;
}

export function getIO(): IO {
  if (!io) io = terminalIO();
  return io;
}
