const logger = require("./utils/logger");
const { env } = require("../src/config");

const SetupServer = require("./utils/server");

const { PORT } = env;

const ExitStatus = {
  Failure: 1,
  Success: 0,
};

// If there is an unhandled exception,
// lets throw the error and let the uncaughtException handle below handle it

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );
  throw reason;
});

//Catch any uncaught exceptions and exit the process
process.on("uncaughtException", (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

//Try to setup, initialize and start the server
(async () => {
  try {
    const server = new SetupServer(PORT);
    await server.init(); 
    await server.start();   

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];

    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {

        try {
          await server.close();
          logger.info(`App exited with success`);
          process.exit(ExitStatus.Success);
        }         
        catch (error) {
          logger.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }

  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
