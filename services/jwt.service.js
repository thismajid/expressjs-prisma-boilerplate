const jwt = require("jsonwebtoken");
const moment = require("moment");

const config = require("../configs/config");

const generateAuthToken = (user, secret = config.jwt.secret) => {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(config.jwt.accessExpirationMinutes, "minutes").unix(),
    type: "access",
  };
  return jwt.sign(payload, secret);
};

const verifyToken = async (token) => {
  return jwt.verify(token, config.jwt.secret);
};

module.exports = {
  generateAuthToken,
  verifyToken,
};
