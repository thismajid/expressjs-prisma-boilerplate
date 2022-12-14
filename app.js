const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const sanitizer = require("perfect-express-sanitizer");

const config = require("./configs/config");
const morgan = require("./configs/morgan");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

if (config.env !== "production") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
} else {
  // enable cors
  app.use(cors());
  app.options("*", cors());
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(
  sanitizer.clean({
    xss: true,
    sql: true,
  })
);

// api routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
