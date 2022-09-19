const joi = require("joi");
const logger = require("../utils/logger");
console.log(process.env.MONGODB_URI, 'mongodburi');

require("dotenv").config();

MONGODB_URI = "mongodb+srv://Teamspace:Teamspace@teamspace-ua.bwi4owb.mongodb.net/?retryWrites=true&w=majority;"

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test", "provision")
      .default("development"),
    TOKEN_EXPIRES: joi.number(),
    PORT: 4010,
  })
  .unknown()
  .required();

const { error, value: env } = schema.validate(process.env);

if (error) {
  logger.error(`Config validation error: ${error.message}`);
}

const secrets = {
  PORT: 4010,
  env: env.NODE_ENV,
  mongoose: env.MONGODB_URI
};

module.exports = secrets;