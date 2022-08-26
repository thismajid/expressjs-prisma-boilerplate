const { version } = require("./../package.json");
const config = require("./../configs");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "node-expressjs-boilerplate API documentation",
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
    },
  ],
};

module.exports = swaggerDef;
