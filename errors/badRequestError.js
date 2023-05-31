/* eslint-env es6 */
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = BadRequestError;