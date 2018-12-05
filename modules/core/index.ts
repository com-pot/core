import app from "./src/app";
import logger from "./src/util/logger";
import config from "./config";

const port: Number = config.get("port");
const env: string = config.get("env");

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
    logger.info(`  App is running at http://localhost:${port} in ${env} mode`);
    logger.info("  Press CTRL-C to stop\n");
});

export default server;
