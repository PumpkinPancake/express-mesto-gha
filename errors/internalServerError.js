/* eslint-env es6 */
class EnternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

module.exports = EnternalServerError;