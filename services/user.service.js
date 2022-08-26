const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (firstname, lastname, email, password) => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return await User.create({
    data: {
      firstname,
      lastname,
      email,
      password,
    },
  });
};

module.exports = {
  createUser,
  getUserByEmail,
};
