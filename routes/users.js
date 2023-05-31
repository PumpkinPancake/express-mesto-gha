/* eslint-env es6 */
const usersRouter = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

const {
  userIDValidator,
  updateUserValidator,
  updateAvatarValidator,
} = require("../middleweares/validation");

usersRouter.get("/", getUsers);
usersRouter.get("/:userId", userIDValidator, getUserById);
usersRouter.post("/", createUser);
usersRouter.patch("/me", updateUserValidator, updateUser);
usersRouter.patch("/me/avatar", updateAvatarValidator, updateAvatar);

module.exports = usersRouter;
