const httpStatus = require("http-status");

const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

/**
 * Login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

/**
 * Register
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const register = async ({ firstname, lastname, email, password }) => {
  const user = await userService.getUserByEmail(email);
  if (user) throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  return await userService.createUser(firstname, lastname, email, password);
};

module.exports = {
  login,
  register,
};
