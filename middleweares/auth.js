/* eslint-env es6 */
const jwt = require("jsonwebtoken");

const UNAUTHORIZED_ERROR = require("../errors/unauthorizedError");

const secretKey = "my-secret-key";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UNAUTHORIZED_ERROR("Registration required");
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UNAUTHORIZED_ERROR("Invalid token"));
    }
    next(err);
  }
};

module.exports = {
  auth
};