class ErrorResponse extends Error {
  status;
  message;
  success;

  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.success = false;
  }
}

export default ErrorResponse;
