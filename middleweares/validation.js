/* eslint-env es6 */

const { Joi, celebrate } = require("celebrate");
const isUrl = require("validator/lib/isURL");

const regex = /^[0-9a-fA-F]{24}$/;

const URLValidator = (url) => {
  if (isUrl(url)) return url;
  throw new Error("Wrong URL");
};

// const IDValidator = (id) => {
//   if (regex.test(id)) return id;
//   throw new Error("Wrong ID");
// };

const cardIDValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(URLValidator),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userIDValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(URLValidator).required(),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(URLValidator).required(),
  }),
});

module.exports = {
  createUserValidator,
  userIDValidator,
  loginValidator,
  updateUserValidator,
  updateAvatarValidator,
  createCardValidator,
  cardIDValidator,
};
