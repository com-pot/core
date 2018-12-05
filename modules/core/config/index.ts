import convict from "convict";
import path from "path";

import mongoFormat from "./ConvictMongoUrlFormat";

convict.addFormat(mongoFormat);

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    port: {
        doc: "Port to listen at",
        format: "port",
        default: 3000,
        env: "PORT"
    },
    mongo: {
        doc: "Database address",
        format: "mongoUrl",
        default: undefined
    }
});

config.loadFile(path.join("modules", "core", "config", config.get("env") + ".json"));

config.validate({
    allowed: "strict"
});

export default config;
