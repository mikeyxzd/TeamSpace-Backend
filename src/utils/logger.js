const pino = require("pino");

module.exports = pino({
  enabled: true,
  level: "info",
});
