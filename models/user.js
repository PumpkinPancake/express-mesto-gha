/* eslint-env es6 */
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const UNAUTHORIZED_ERROR = require("../errors/unauthorizedError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: "Wrong URL",
    },
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Wrong email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function searchUser(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UNAUTHORIZED_ERROR("Wrong email or password")
        );
      }
      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UNAUTHORIZED_ERROR("Wrong email or password")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
