import app from "./src/app";
import logger from "./src/util/logger";

/**
 * Start Express server.
 */
const server = app.listen(3000, () => {
    logger.info(`  App is running at http://localhost:${3000} in ${app.get("env")} mode`);
    logger.info("  Press CTRL-C to stop\n");
});

export default server;
