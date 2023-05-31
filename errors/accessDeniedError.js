/* eslint-env es6 */
class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = AccessDeniedError;