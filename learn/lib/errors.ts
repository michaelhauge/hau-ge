/** An error meant for the person at the terminal: printed without a stack trace. */
export class LearnError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LearnError";
  }
}
