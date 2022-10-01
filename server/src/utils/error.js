class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}
class BadRequest extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "Bad Request";
  }

  getCode() {
    return 400;
  }
}

class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "Not found";
  }

  getCode() {
    return 404;
  }
}

exports.NotFound = NotFound;
exports.BadRequest = BadRequest;
