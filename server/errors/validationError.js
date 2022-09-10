function ValidationError(message) {
    this.name = "ValidationError";
    this.message = message;
}

ValidationError.prototype = Error.prototype;

module.exports = ValidationError;