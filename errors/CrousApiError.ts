export class CrousApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CrousApiError";
  }
}
