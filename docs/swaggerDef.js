const { version } = require("./../package.json");
const config = require("./../configs/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "node-expressjs-boilerplate API documentation",
    version,
  },
  servers: [
    {
      url: `http://${config.host}:${config.port}`,
    },
  ],
};

module.exports = swaggerDef;
