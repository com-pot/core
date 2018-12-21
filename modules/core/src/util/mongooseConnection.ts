
import logger from "./logger";
import config from "../../config";
import mongoose from "mongoose";

// Connect to MongoDB
const mongoUrl = config.get<string>("mongo");

mongoose.Promise = Promise;
mongoose.connect(mongoUrl)
    .then(() => logger.info("Mongoose is ready to use"))
    .catch((err: any) => {
        logger.error("MongoDB connection error: " + err);
        // process.exit();
    });

export default mongoose.connection;
