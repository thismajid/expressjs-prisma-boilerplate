const httpStatus = require("http-status");
const { PrismaClient } = require("@prisma/client");
const { compare, hash } = require("bcryptjs");

const ApiError = require("../utils/ApiError");

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "User" && params.action == "create") {
    params.args.data.password = await hash(params.args.data.password, 8);
  }
  return next(params);
});

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

const isPasswordMatch = async (password, userPassword) => {
  return await compare(password, userPassword);
};

/**
 * Create a user
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const createUser = async (firstname, lastname, email, password) => {
  if (await getUserByEmail(email))
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  return await prisma.user.create({
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
  isPasswordMatch,
};
