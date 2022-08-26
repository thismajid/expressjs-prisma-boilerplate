const httpStatus = require("http-status");

const authService = require("./../services/auth.service");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const access_token = await authService.generateAuthToken(user);
    res.json({
      message: "success",
      data: {
        user,
        access_token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const params = req.body;
    const user = await authService.register(params);
    res.status(httpStatus.CREATED).json({
      message: "success",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
